import {
	get,
	computed,
	inject
} from "Ember";
import ModalDialogComponent from "components/modal/ModalDialogComponent";
import { openBrowser } from "nwjs/Shell";
import layout from "templates/components/modal/ModalNewreleaseComponent.hbs";


const { readOnly } = computed;
const { service } = inject;


export default ModalDialogComponent.extend({
	versioncheck: service(),

	layout,

	"class": "modal-newrelease",

	outdated: readOnly( "versioncheck.versionOutdated" ),
	latest  : readOnly( "versioncheck.versionLatest" ),


	actions: {
		download( success ) {
			var url = get( this, "versioncheck.downloadURL" );
			if ( url ) {
				openBrowser( url );
				if ( success instanceof Function ) {
					success();
				}
			}

			this.send( "ignore" );
		},

		ignore() {
			get( this, "versioncheck" ).ignoreRelease();
			this.send( "close" );
		}
	}
});
