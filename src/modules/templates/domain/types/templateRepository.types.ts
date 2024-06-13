import {
	ITemplate6Repository,
	ITemplate7Repository,
	ITemplate9Repository,
	ITemplate10Repository,
	ITemplate12Repository,
	ITemplate15Repository,
	IWapiTemplateRepository
} from "../repositories"

export type TemplateRepository =
	| ITemplate15Repository
	| ITemplate6Repository
	| IWapiTemplateRepository
	| ITemplate12Repository
	| ITemplate7Repository
	| ITemplate9Repository
	| ITemplate10Repository
