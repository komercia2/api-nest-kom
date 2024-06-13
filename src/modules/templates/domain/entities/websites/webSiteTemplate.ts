import { Template6Entity } from "../template6/template6"
import { Template7Entity } from "../template7"
import { Template12Entity } from "../template12"
import { Template15 } from "../template15"
import { WapiTemplateEntity } from "../wapi"

export type WebSiteTemplate =
	| Template15
	| Template6Entity
	| WapiTemplateEntity
	| Template12Entity
	| Template7Entity
