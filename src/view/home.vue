<template>
	<div>
		<h1>HOME</h1>
		<p>username:{{user.userName}}</p>
		<p>访问次数:{{pagecount}}</p>
	</div>
</template>

<script>
export default{
	data(){
		return {
			user: {
				userName: '',
				password: '',
				email: '',
				phone: '',
				company: '',
				sex: '',
				registerTime: null,
				realName: ''
			},
			pagecount: undefined
		}
	},
	methods:{
		loadUserData :function(){
			this.user=Object.assign({},JSON.parse(sessionStorage.getItem("userData")))
			console.log(this.user)
		},
		getPageCount :function(){
			if (localStorage.pagecount){
				localStorage.pagecount=Number(localStorage.pagecount) +1;
			}
			else{
				localStorage.pagecount=1;
			}
			this.pagecount=localStorage.pagecount
		}
	},
	mounted	() {
		this.loadUserData()
		this.getPageCount()
	}
}

</script>

<style>
body{
	background-image: none
}
</style>
