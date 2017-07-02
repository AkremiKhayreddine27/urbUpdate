import {Form} from "./Form";
const editUser = new Vue({
    el: '#edit',
    data: {
        edit: false,
        user: {},
        form: new Form({
            model: {
                name: '',
                email: '',
                phone: '',
                address: ''
            }
        })
    },
    methods: {
        getAuth(){
            let _this = this;
            return new Promise(function (resolve, reject) {
                axios.get('/auth').then(response => {
                    _this.user = response.data;
                    _this.form.model = response.data;
                    let roles = [];
                    for (let role in _this.user.roles) {
                        roles.push(_this.user.roles[role].id)
                    }
                    _this.user.roles = roles;
                    resolve();
                });
            });
        },
        editUser(){
            delete this.form.model["roles"];
            this.form.patch('/api/users/' + this.form.model.id).then(data => {
                this.getAuth();
            });
        },
    },
    mounted(){
        this.getAuth();
    }
});