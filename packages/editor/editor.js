var capitalize = function (str) {
    return str[0].toUpperCase() + str.slice(1);
};

var defaultFieldOptions = {
    'name': 'fieldName',                    // defauls to field key
    'type': 'text',                         // textarea, select, radio, checkbox. Default: 'text'
    'options': null,                        // object with k-v pairs or simple [] (data provider for select/radio/checkbox)
    'label': 'Field label',                 // defaults to capitalized field name,
    'default': null,                        // default value when no value object is provided
    'post': function (v) { return v; },     // method executed after data retrieval
    'render': function () { return true; }  // method executed to check if field has to be rendered
};

var logobj = function (obj) {
    if (typeof console !== 'undefined') {
        console.log(obj);
  }
};

var defaultOptions = {
    'fields': {       // should be overwritten when using, this is a sample cfg
        'fieldName0': defaultFieldOptions
        /* ... */
    },
    'data': {},        // some object to populate the fields
    'save': logobj,    // callback for when save is pressed
    'discard': logobj  // callback for when cancel / close is pressed
};

var setupOptions = function (options) {
    options = $.extend({}, defaultOptions, options);

    var fieldArr = [];
    for (var fieldName in options.fields) {
        if (options.fields.hasOwnProperty(fieldName)) {
            var field = options.fields[fieldName];
            field['default'] = _.isFunction(field['default']) ? field['default']():field['default'];
            var calcdOpts = {
                name: fieldName,
                label: capitalize(fieldName),
                value: _.isUndefined(options.data[fieldName]) ? field['default']:options.data[fieldName]
            };
            if (typeof field === 'object') {
                field = $.extend({}, defaultFieldOptions, calcdOpts, field);

                field.options = _.map(field.options, function (e, key) {
                    return {
                        value: typeof key === 'number' ? e:key,
                        name: e};
                    });
            } else {
                field = $.extend({}, defaultFieldOptions, calcdOpts);
            }
            fieldArr.push(field);
        }
    }
    options.fields = fieldArr;
    return options;
};

Template.meteorEditor.field = function (){
    var i;
    var templateName = ('meteorEditor' + capitalize(this.type));
    if (Template[templateName]) {
        i = Template[templateName](this);
    } else {
        i = 'ERROR Template.' + templateName + 'not specified';
    }
    return i;
};

Template.meteorEditorSelect.selected = function (selection) {
    return this.value === selection ? 'selected="selected"':'';
};


Editor = function (options) {
    options = setupOptions(options);

    var $el;

    var elForName = function (name) {
        return $('#' + name.replace(/\./gi, '\\.'), $el);
    };

    var collectData = function () {
        var data = {};
        for (var i = options.fields.length - 1; i >= 0; i--) {
            var field = options.fields[i];
            var val;
            switch(field.type) {
                case 'file':
                var files = elForName(field.name)[0].files;
                val = files.length > 0 ? files[0]:null;
                break;
                case 'checkbox':
                val = elForName(field.name).prop('checked');
                break;
                default:
                val = elForName(field.name).val();
                break;
            }
            data[field.name] = field.post(val);
        }
        return data;
    };
    var hideAnd = function (actionName) {
        options[actionName](collectData());
        $el.addClass('init');
        setTimeout(function (){
            $el.remove();
        }, 500);
    };

    this.show = function () {
        $('body').append($el);
        $el.find('form').on('submit', function (e) {
            e.preventDefault();
            hideAnd('save');
        }).on('click', '.discard', function (e) {
            e.preventDefault();
            hideAnd('discard');
        });
        setTimeout(function (){
           $el.removeClass('init');
       });
    };



    var init = function () {
        $el = $(Template.meteorEditor(options));
    };

    init();
};
