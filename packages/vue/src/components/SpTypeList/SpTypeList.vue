<template>
	<div class="sp-type-list" v-if="depsLoaded">
		<div class="sp-type-list__main sp-box">
			<div class="sp-type-list__header sp-box-header">
				{{ moduleType.toUpperCase() + 'S' }}
			</div>
			<div class="SpTypeListEmpty" v-if="!typeItems || typeItems.length == 0">
				<em>No items available</em>
			</div>
			<template v-else>
				<div v-for="(item, index) in typeItems" v-bind:key="item.id">
					<div class="sp-dashed-line" v-if="index != 0" />
					<div class="sp-type-list__item">
						<div class="sp-type-list__item__icon">
							<div class="sp-icon sp-icon-Docs" />
						</div>
						<div class="sp-type-list__item__details">
							<div
								class="sp-type-list__item__details__field"
								v-for="field in fieldList"
								v-bind:key="field"
							>
								<strong> {{ capitalize(field.name) }} </strong><br />
								{{ item[field.name] }}
							</div>
						</div>
						<div
							class="sp-type-list__item__more"
							:class="{ 'sp-type-list__item__more__open': moreOpen == index }"
							v-if="address"
						>
							<div class="sp-icon sp-icon-More" v-on:click="moreOpen = index" />
							<div
								class="sp-type-list__item__options sp-box"
								v-if="moreOpen == index"
							>
								<div
									class="sp-type-list__item__options__edit"
									v-on:click=";(editID = item['id']), (editOpen = true)"
								>
									Edit
								</div>
								<div
									class="sp-type-list__item__options__delete"
									v-on:click=";(deleteID = item['id']), (deleteOpen = true)"
								>
									Delete
								</div>
							</div>
						</div>
					</div>
				</div>
			</template>
		</div>
		<div class="sp-type-list__overlay" v-if="editOpen || deleteOpen" />
		<div class="sp-type-list__edit__form" v-if="editID > 0">
			<SpTypeForm
				:modulePath="modulePath"
				:moduleType="moduleType"
				:id="editID"
				action="update"
				v-on:cancel-update=";(editID = -1), (editOpen = false)"
				v-on:updated=";(editID = -1), (editOpen = false)"
			/>
		</div>
		<div class="sp-type-list__delete__form" v-if="deleteID > 0">
			<SpTypeForm
				:modulePath="modulePath"
				:moduleType="moduleType"
				:id="deleteID"
				action="delete"
				v-on:cancel-delete=";(deleteID = -1), (deleteOpen = false)"
				v-on:deleted=";(deleteID = -1), (deleteOpen = false)"
			/>
		</div>
	</div>
</template>
<script>
export default {
	name: 'SpTypeList',
	props: {
		moduleType: {
			type: String,
			default: ''
		},
		modulePath: {
			type: String,
			default: ''
		}
	},
	data: function () {
		return {
			fieldList: [],
			moreOpen: -1,
			editOpen: false,
			deleteOpen: false,
			editID: 0,
			deleteID: 0
		}
	},
	computed: {
		address() {
			return this.$store.getters['common/wallet/address']
		},
		typeItems() {
			if (this._depsLoaded) {
				let items = this.$store.getters[
					this.modulePath + '/get' + this.moduleType + 'All'
				]({ params: {} })
				return items ? items[this.capitalize(this.moduleType)] : []
			} else {
				return []
			}
		},
		depsLoaded() {
			return this._depsLoaded
		}
	},
	beforeCreate() {
		const module = [...this.modulePath.split('/')]
		for (let i = 1; i <= module.length; i++) {
			let submod = module.slice(0, i)
			if (!this.$store.hasModule(submod)) {
				console.log('Module ' + this.modulePath + ' has not been registered!')
				this._depsLoaded = false
				break
			}
		}
	},
	async created() {
		if (this._depsLoaded) {
			this.fieldList = this.$store.getters[
				this.modulePath + '/getTypeStructure'
			](this.moduleType)
			await this.$store.dispatch(
				this.modulePath + '/Query' + this.moduleType + 'All',
				{ options: { subscribe: true } }
			)
		}
	},
	methods: {
		capitalize(str) {
			return str.charAt(0).toUpperCase() + str.slice(1)
		}
	}
}
</script>
