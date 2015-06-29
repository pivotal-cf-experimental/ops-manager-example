# Concerns/Observations
## Assumptions/What is Ops Manager
1. Assumptions say: we expect you to know ops-manager; following section: what is ops-manager. do we need the 'what is ops man?' should we redirect to another page to reinforce those assumptions?

## How should a product be packaged?

1. The following is very hard to understand:
  > Note that the `reference: .snapshots key-value pair` in the `property_inputs` section of the `redis_snapshotting_collection` references [9a], a global `property_blueprints` section. This `property_blueprints` section describes the global `.snapshots` collection property, and not the `property_blueprints` on a `job_type`.
1. Regarding `static_ip` / `dynamic_ip` => we should stop having two booleans for one (they are not on sale)
1. The following is unclear, possibly un-true (-aram). The second sentence is also conflates two distinct lists of concepts without clarifying punctuation (-ryan).
  > property_blueprints: There are two kinds of blueprints. Property blueprints, their settings, types and defaults are further explored in the Types section.
1. weird clause break in this sentence:
  > Properties that you need to put in your BOSH manifest, underneath the appropriate job, are created here. 
1. This numbering seems out of date. `post_deploy_errand` is #6 in the list.
  > This must correspond to the `post_deploy_errand` listed in #7 above.

## More on Product Templates - Property Blueprints
1. Should 'type' be `property_blueprint`?
  > For a type to show up in the UI, it must be configurable.
1. This should probably reference `(())` syntax since "accessor" only makes sense in that context
  > For each type, one or many accessors are defined below. 

1. The stemcell criteria section should have more description.
  > requires_cpi is never explained
1. Job types section is unclear about what the entries mean, `resource_label`, `job_templates`,
 `release`
1. Metadata v1.5 replaces `job_types: > job_templates:` with `job_types: > templates:`
  * `templates` are now a hash containing `name:` and `release:`
1. `instance_definitions` is unnecessarily complex, being an array suggest that we can have many.
1. `property_blueprints` contain a `vm_credentials`. There is no indication that this is required - it is. Nor is there an indication that the `default` for `identity` must be `vcap` - this is because bosh does not allow the VM user to be set.

