const showClaim = new Vue({
    el: '#showClaim',
    data: {
        claim: {},
        circle: 'circle',
        user: {},
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
        getClaim(){
            var url = window.location.pathname;
            axios.get('/api' + url).then(response => {
                this.claim = response.data;
                this.claim.updated_at = moment(this.claim.updated_at).from(moment());
                for (let adjustment in this.claim.adjustments) {

                    this.claim.adjustments[adjustment].updated_at = moment(this.claim.adjustments[adjustment].updated_at).from(moment());
                    this.claim.adjustments[adjustment].old_version = JSON.parse(this.claim.adjustments[adjustment].old_version);
                    this.claim.adjustments[adjustment].new_version = JSON.parse(this.claim.adjustments[adjustment].new_version);
                }
            });
        },
        findUser(id){
            let user;
            axios.get("/api/users/" + id).then(response => {
                user = response.data;
            });
            return user;
        },
        saveClaim(){
            this.form.patch('/claims/' + this.claim.id).then(response => {
                this.claim = response;
                this.form.model.title = response.title;
                this.form.model.description = response.description;
            });
        },
        validateFeature(claim){
            let newClaim = {};
            newClaim.id = claim.id;
            newClaim.titre = claim.titre;
            newClaim.description = claim.description;
            newClaim.type = claim.type;
            newClaim.planification = claim.planification;
            newClaim.etat_avancement = claim.etat_avancement;
            newClaim.epannelage = claim.epannelage;
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
                this.getClaim();
                Event.$emit('alert', 'Votre modification a été enregistrer avec succé');
            });
        },
        cancelFeature(claim){
            let newClaim = {};
            newClaim.id = claim.id;
            newClaim.titre = claim.titre;
            newClaim.description = claim.description;
            newClaim.type = claim.type;
            newClaim.planification = claim.planification;
            newClaim.etat_avancement = claim.etat_avancement;
            newClaim.epannelage = claim.epannelage;
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
                this.getClaim();
                Event.$emit('alert', 'Votre modification a été enregistrer avec succé');
            });
        }
    },
    mounted(){
        this.getAuth().then(() => {
            this.getClaim();
        });
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
    }
});