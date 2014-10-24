/// <reference path="/Scripts/backbone.js" />

window.Employee = Backbone.Model.extend({
    // 模型值校验
    validate: function (attrs) {
        for (var key in attrs) {
            if (attrs[key] === '') {
                return key + '不能为空';
            }
            if (key === 'age' && isNaN(attrs.age)) {
                return '年龄必须是数字';
            }
        }
    }
});

window.EmployeeList = Backbone.Collection.extend({
    model: Employee,
    localStorage: new Store('employees')
});

window.Employees = new EmployeeList();

window.EmployeeView = Backbone.View.extend({
    tarName: 'tr',
    template: _.template($('#item-template').html()),
    event: {
        'dblclick td': 'edit',
        'blur input,select': 'close',
        'click .del':'clear'
    },
    initialize: function () {
        // 每次更新模型后重新渲染
        this.model.bind('change', this.render, this);
        // 每次删除模型之后自动移除 UI
        this.model.bind('destory', this.remove, this);
    },
    setText: function () {
        var model = this.model;
        this.input = $(this.el).find('input,select');
        this.input.each(function () {
            var input = $(this);
            input.val(model.get(input.attr('name')));
        });
    },
    close: function (e) {
        var input = $(e.currentTarget),
            obj;
        obj[input.attr('name')] = input.val();
        this.model.save(obj);
        $(e.currentTarget).parent().parent().removeClass('editing');
    },
    edit: function (e) {
        $(e.currentTarget).addClass('editing').find('input.select').focus();
    },
    render: function () {
        $(this.el).html(this.template(this.model.toJSON));
        // 把每个单元格的值赋予隐藏的输入框
        this.setText();
        return this;
    },
    remove: function () {
        $(this.el).remove();
    },
    clear: function () {
        this.model.destory();
    }
});

window.AppView = Backbone.View.extend({
    el: $('#app'),
    events: {
        'click .#add-btn': 'createOnEnter'
    },
    initialize: function () {
        Employees.bind('add', this.addOne, this);

        // 调用 fetch 的时候触发 reset
        Employees.bind('reset', this.addAll, this);
        Employees.fetch();
    },
    createOnEnter: function (e) {
        var employee = new Employee();
        var attr = {};
        $('#emp-form input,#emp-form select').each(function () {
            var input = $(this);
            attr[input.attr('name')] = input.val();
        });
        employee.bind('error', function (model, error) {
            alert(error);
        });
        if (employee.set(attr)) {
            Employees.create(employee);
        }
    },
    addOne: function (employee) {
        var view = new EmployeeView({ model: employee });
        employee.set({ 'eid': employee.get('eid') || Employees.length });
        employee.bind('error', function (model, error) {
            alert(error);
        });
        $('#.emp-table tbody').append(view.render().el);
    },
    addAll: function () {
        Employees.each(this.addOne);
    }
});

window.App = new AppView();