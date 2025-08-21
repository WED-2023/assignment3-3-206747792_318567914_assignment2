
<template>
	<div class="container mt-4">
		<h2 class="mb-4">My Recipes</h2>
		<RecipePreviewList
			ref="myRecipesList"
			title="My Recipes"
			type="my-recipes"
			v-if="recipes.length"
			:recipes="recipes"
		/>
		<div v-else class="text-center text-muted mt-5" style="font-size:1.2em">
			You haven’t created any recipes yet — why not share your first one?
		</div>
	</div>
</template>

<script>
import { ref, onMounted } from 'vue';
import RecipePreviewList from '../components/RecipePreviewList.vue';
import axios from 'axios';
import store from '../store';

export default {
	name: 'MyRecipesPage',
	components: { RecipePreviewList },
	setup() {
		const recipes = ref([]);
		const fetchMyRecipes = async () => {
			try {
				const { data } = await axios.get(
				store.server_domain + '/user/my-recipes',
					{ withCredentials: true }
				);
				recipes.value = Array.isArray(data) ? data : [];
			} catch (e) {
				recipes.value = [];
			}
		};
		onMounted(fetchMyRecipes);
		return { recipes };
	}
};
</script>
