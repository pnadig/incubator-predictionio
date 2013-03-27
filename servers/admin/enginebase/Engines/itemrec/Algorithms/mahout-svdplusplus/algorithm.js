var MahoutSVDPlusPlusAlgoSettingsModel = Backbone.Model.extend({
	/* Required params: app_id, engine_id, id (algo_id) */
	urlRoot: function(){ 
		return '/modules/itemrec/settings/app/'+ this.get("app_id") +'/engine/' + this.get("engine_id") + '/mahout-svdplusplus';
	}
});

var MahoutSVDPlusPlusAlgoSettingsView = Backbone.View.extend({
    el: '#mahout-svdplusplusContentHolder', 
    initialize : function() {
    	this.form_el = '#mahout-svdplusplusForm';
        this.template = _.template($("#mahout-svdplusplusTemplate").html());
		this.app_id = this.options.app_id;
		this.engine_id = this.options.engine_id;
		this.algo_id = this.options.algo_id;
		this.model = new MahoutSVDPlusPlusAlgoSettingsModel({app_id: this.app_id, engine_id: this.engine_id, id: this.algo_id})
		var self = this;
		this.model.fetch({
			success: function() {
				self.render();
				self.initValue('numFeatures');
				self.initValue('learningRate');
				self.initValue('preventOverfitting');
				self.initValue('randomNoise');
				self.initValue('numIterations');
				self.initValue('learningRateDecay')
				self.initValue('viewParam');
				self.initValue('likeParam');
				self.initValue('dislikeParam');
				self.initValue('conversionParam');
				self.initValue('conflictParam');
			}
		});
    },
    initValue: function(attrName){
		var value = this.model.get(attrName);
		this.$el.find('#mahout-svdplusplus_'+attrName).val(value);
    },
	events: {
		"change #mahout-svdplusplusForm input":  "formDataChanged",
		"change #mahout-svdplusplusForm select":  "formDataChanged"
	},
    render : function() {
        this.$el.html(this.template());
        return this;
    },
	reloadData : function() { // Required Algorithm Module Function
	},
	formDataChanged: function() {
		var data = formToJSON(this.$el.find(this.form_el)); // convert form names/values of fields into key/value pairs
		console.log(data);
		this.model.set(data);
		this.model.save();
		/*
		var simEvalModel = new SimEvalModel({app_id: this.app_id, engine_id: this.engine_id});
		var self = this;
		simEvalModel.save(data, {
			wait: true,
			success: function(model, res) {
				window.location.hash = 'engineTabAlgorithms';
			},
			error: function(model, res){
				alert("An error has occured. HTTP Status Code: "
						+ res.status);
			}
		});
		return false;
		*/
	},
    close : function() {  // Required Algorithm Module Function
        this.remove();
        this.off();
        // handle other unbinding needs, here
        _.each(this.subViews, function(subView){
            if (subView.close){
                subView.close();
            }
        });
    }
});

createAlgorithmView = function(app_id, engine_id, algo_id) { // Required Algorithm Module Function
    return new MahoutSVDPlusPlusAlgoSettingsView({app_id: app_id, engine_id: engine_id, algo_id: algo_id});
};