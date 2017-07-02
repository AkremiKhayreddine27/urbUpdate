import {Form} from "./Form";
const editClaim = new Vue({
    el: '#editClaim',
    data: {
        claim: {
            id: 0,
        },
        form: new Form({
            model: {
                id: 0,
                title: '',
                description: '',
                created_at: '',
                updated_at: '',
                user: {},
                feature: {},
              //  adjustments: [],
                photos: []
            }
        }),
        zone: {},
    },
    methods: {
        getClaim(){
            var url = window.location.pathname;
            axios.get('/api' + url).then(response => {
                this.claim = response.data;
                this.form.model.id = response.data.id;
                this.form.model.title = response.data.title;
                this.form.model.description = response.data.description;
                this.form.model.created_at = response.data.created_at;
                this.form.model.updated_at = response.data.updated_at;
                this.form.model.user = response.data.user;
                this.form.model.feature = response.data.feature;
               // this.form.model.adjustments = response.data.adjustments;
                this.form.model.photos = response.data.photos;
            });
        },
        saveClaim(){
            let vm = this;
            this.form.patch('/claims/' + this.claim.id).then(response => {
                this.claim = response;
                this.form.model.title = response.title;
                this.form.model.description = response.description;
                if (this.zone.files.length > 0) {
                    this.zone.options.url = "/claims/" + vm.claim.id + "/upload";
                    this.zone.processQueue();
                } else {
                    vm.getClaim();
                    Event.$emit('alert', 'Votre modification a été enregistrer avec succé');
                }
            });
        },
        deletePhoto(photoId){
            let vm = this;
            axios.delete('/claims/' + this.claim.id + '/photos/' + photoId).then(() => {
                vm.getClaim();
                Event.$emit('alert', 'Votre modification a été enregistrer avec succé');
            })
        }
    },
    mounted(){
        this.getClaim();
        let vm = this;
        Dropzone.autoDiscover = false;
        this.zone = new Dropzone('#dzone', {
            url: "/claims/" + vm.claim.id + "/upload",
            autoProcessQueue: false,
            uploadMultiple: true,
            parallelUploads: 100,
            maxFiles: 100,
            dictDefaultMessage: 'Déposez vos photos ici',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            init: function () {
                // Set up any event handlers
                this.on('completemultiple', function () {
                    vm.getClaim();
                    Event.$emit('alert', 'Votre modification a été enregistrer avec succé');
                });
            }
        });
    }
});