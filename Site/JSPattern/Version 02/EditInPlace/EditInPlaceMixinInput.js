// 职能类
function EditInPlaceMixinInput(id, parent, value) {
    this.id = id;
    this.value = value || 'default value';
    this.parentElement = parent;

    this.createElement(this.id);
    this.attactEvent();
}