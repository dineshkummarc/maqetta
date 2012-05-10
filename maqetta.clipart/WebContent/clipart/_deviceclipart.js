define([
	"dojo/_base/declare",
	"./_clipart"
], function(declare, _clipart){

	return declare("clipart._deviceclipart", [_clipart], {
		
		orientation:'portrait',
		preserveAspectRatio:true,
		DeviceClipart:true,
		//DeviceRect_portrait:{ w:385.5645, h:747.8577 },

		postCreate: function(){
			//debugger;
			var oldVisibility = this.domNode.style.visibility;
			this.domNode.style.visibility = 'hidden';
			var index = this.declaredClass.lastIndexOf('.');
			if(index < 0){
				index = 0;
			}
			var dj = this.domNode.ownerDocument.defaultView.dojo;
			this._url = this.declaredClass.substr(index+1) + '_' + this.orientation + '.svg';
			this.url = dj.moduleUrl("clipart", this._url);
			this.UpdateStyle();
			//this.domNode.style.display = "inline-block";
			this.domNode.style.visibility = oldVisibility;
		},
		
		UpdateStyle: function(){
			this.domNode.style.backgroundImage = "url('"+this.url+"')";
			this.domNode.style.backgroundRepeat = "no-repeat";
			this.domNode.style.backgroundPosition = "center center";
			var w, h, bgsize;
			if(this.defaultWidth && this.defaultHeight && this.preserveAspectRatio){
				// set largest dimension to 100%, the other dimension to aspect ratio * 100%
				if(this.defaultWidth > this.defaultHeight){
					w = 100;
					h = w * this.defaultHeight / this.defaultWidth;
				} else {
					h = 100;
					w = h * this.defaultWidth / this.defaultHeight;
				}
				if(this.orientation == 'landscape'){
					bgsize = h + '% ' + w + '%';
				}else{
					bgsize = w + '% ' + h + '%';
				}
			}else{
				bgsize = '100% 100%';
			}
			this._setCSS3Property(this.domNode, 'backgroundSize', bgsize);
		},
		
		_setCSS3Property: function(node, domProperty, value){
			var style = node.style;
			var domPropertyUC = domProperty.charAt(0).toUpperCase() + domProperty.slice(1);
			style['webkit'+domPropertyUC] = value;
			style['Moz'+domPropertyUC] = value;
			style['ms'+domPropertyUC] = value;
			style['o'+domPropertyUC] = value;
			style[domProperty] = value;
		}

	});
});