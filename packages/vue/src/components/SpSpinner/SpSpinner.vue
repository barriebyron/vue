<!--
-- Referenced from: https://loading.io/css/
-->
<template>
	<div class="lds-ring">
		<div></div>
		<div></div>
		<div></div>
		<div></div>
	</div>
</template>

<style scoped>
.lds-ring {
	position: relative;
	width: 100%;
	height: 100%;
}
.lds-ring div {
	box-sizing: border-box;
	display: block;
	position: absolute;
	width: 100%;
	height: 100%;
	border: 1px solid var(--sp-c-txt-third);
	border-radius: 50%;
	animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
	border-color: var(--sp-c-txt-third) transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
	animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
	animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
	animation-delay: -0.15s;
}
@keyframes lds-ring {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
</style>
<script>
export default {
	name: 'SpSpinner'
}
</script>
