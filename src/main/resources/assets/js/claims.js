import {ScaleLoader} from 'vue-spinner/dist/vue-spinner.min.js'
const claims = new Vue({
    el: '#claims',
    data: {
        claims: [],
        user: {},
        loading: true,
        color: '#EF662F',
        width: '10px',
    },
    computed: {
        isAdmin(){
            let result = false;
            for (let role in this.user.roles) {
                if (this.user.roles[role] == 1) {
                    result = true;
                    break;
                }
            }
            return result;
        },
        isAgent(){
            let result = false;
            for (let role in this.user.roles) {
                if (this.user.roles[role] == 2) {
                    result = true;
                    break;
                }
            }
            return result;
        },
        chunkedClaims () {
            var url = window.location.pathname;
            if (url != '/claims') {
                return _.chunk(this.claims, 4);
            } else {
                return _.chunk(this.claims, 4);
            }
        }
    },
    methods: {
        getAuth(){
            let _this = this;
            return new Promise(function (resolve, reject) {
                axios.get('/auth').then(response => {
                    _this.user = response.data;
                    let roles = [];
                    for (let role in _this.user.roles) {
                        roles.push(_this.user.roles[role].id)
                    }
                    _this.user.roles = roles;
                    resolve();
                });
            });
        },
        getClaims(){
            axios.get('/api/claims').then(response => {
                this.claims = response.data;
                for (let claim in this.claims) {
                    this.claims[claim].updated_at = moment(this.claims[claim].updated_at).from(moment());
                }
                this.loading = false;
            })
        },
        getUserClaims(id){
            axios.get('/api/users/' + id + '/claims').then(response => {
                this.claims = response.data;
                for (let claim in this.claims) {
                    this.claims[claim].updated_at = moment(this.claims[claim].updated_at).from(moment());
                }
                this.loading = false;
            })
        },
        validateFeature(claim){
            let newClaim = {};
            newClaim.id = claim.id;
            newClaim.title = claim.title;
            newClaim.description = claim.description;
            newClaim.created_at = claim.created_at;
            newClaim.user = claim.user;
            newClaim.feature = claim.feature;
            // this.form.model.adjustments = response.data.adjustments;
            newClaim.photos = claim.photos;
            newClaim.updated_at = moment();
            axios.patch('/api/features/' + claim.feature.id, {
                status: 'validée',
                claim: newClaim
            }).then(response => {
                this.getClaims();
                Event.$emit('alert', 'Votre modification a été enregistrer avec succé');
            });
        },
        cancelFeature(claim){
            let newClaim = {};
            newClaim.id = claim.id;
            newClaim.title = claim.title;
            newClaim.description = claim.description;
            newClaim.created_at = claim.created_at;
            newClaim.user = claim.user;
            newClaim.feature = claim.feature;
            // this.form.model.adjustments = response.data.adjustments;
            newClaim.photos = claim.photos;
            newClaim.updated_at = moment();
            axios.patch('/api/features/' + claim.feature.id, {
                status: 'annulée',
                claim: newClaim
            }).then(response => {
                this.getClaims();
                Event.$emit('alert', 'Votre modification a été enregistrer avec succé');
            });
        }
    },
    mounted(){
        let _this =this;
        this.getAuth().then(() => {
            var url = window.location.pathname;
            if (url != '/claims') {
                let userId = _this.user.id;
                this.getUserClaims(userId);
            } else {
                this.getClaims();
            }
        });
    },
    components: {
        ScaleLoader
    },
});