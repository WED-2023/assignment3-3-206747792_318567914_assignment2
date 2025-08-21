

<script>

import axios from 'axios';
import { ref, reactive, computed } from 'vue';

const cuisines = ref([
	'Italian', 'French', 'Chinese', 'Indian', 'Mexican', 'American', 'Thai', 'Japanese', 'Spanish', 'Greek', 'Other'
]);
const diets = ref([
	"Gluten Free","Ketogenic","Vegetarian","Lacto-Vegetarian","Ovo-Vegetarian","Vegan","Pescetarian","Paleo","Primal","Low FODMAP","Whole30"
]);
const intolerancesList = ref([
	"Dairy","Egg","Gluten","Grain","Peanut","Seafood","Sesame","Shellfish","Soy","Sulfite","Tree Nut","Wheat"
]);

const showModal = ref(false);
const loading = ref(false);
const error = ref("");
const success = ref("");
const form = reactive({
	title: "",
	image: "",
	readyInMinutes: null,
	servings: null,
	ingredients: [ { name: '', amount: '', unit: '' } ],
	instructions: "",
	cuisines: [],
	diets: [],
	intolerances: [],
	vegan: false,
	vegetarian: false,
	glutenFree: false
});

const titleState = computed(() => form.title.trim().length > 0 ? true : null);
const minutesState = computed(() => form.readyInMinutes > 0 ? true : null);
const servingsState = computed(() => form.servings > 0 ? true : null);
const instructionsState = computed(() => form.instructions.trim().length > 0 ? true : null);
const ingredientsState = computed(() => form.ingredients.length > 0 && form.ingredients.every(i => i.name && i.amount));
const formValid = computed(() => titleState.value && minutesState.value && servingsState.value && instructionsState.value && ingredientsState.value);

function addIngredient() {
	form.ingredients.push({ name: '', amount: '', unit: '' });
}
function removeIngredient(idx) {
	if (form.ingredients.length > 1) form.ingredients.splice(idx, 1);
}
function resetForm() {
	form.title = "";
	form.image = "";
	form.readyInMinutes = null;
	form.servings = null;
	form.ingredients = [ { name: '', amount: '', unit: '' } ];
	form.instructions = "";
	form.cuisines = [];
	form.diets = [];
	form.intolerances = [];
	form.vegan = false;
	form.vegetarian = false;
	form.glutenFree = false;
	error.value = "";
	loading.value = false;
}
function onCancel() {
	showModal.value = false;
	resetForm();
}

async function onSubmit() {
	error.value = "";
	if (!formValid.value) return;
	loading.value = true;
	try {
		const payload = {
			title: form.title,
			readyInMinutes: form.readyInMinutes,
			ingredients: form.ingredients.map((ingredient) => ingredient.name),
			instructions: form.instructions,
			image: form.image || undefined,
			servings: form.servings || undefined,
			vegan: form.vegan,
			vegetarian: form.vegetarian,
			glutenFree: form.glutenFree,
		};
		await axios.post(
			"http://localhost:3000/user/my-recipes",
			payload,
			{ withCredentials: true }
		);
		showModal.value = false;
		resetForm();
		success.value = "Recipe created successfully!";
	} catch (err) {
		if (err.response && err.response.data && err.response.data.message) {
			error.value = err.response.data.message;
		} else {
			error.value = "An error occurred while creating the recipe.";
		}
	} finally {
		loading.value = false;
	}
}

export default {
	name: 'CreateRecipePage',
		setup() {
			return {
				cuisines,
				diets,
				intolerancesList,
				showModal,
				loading,
				error,
				success,
				form,
				titleState,
				minutesState,
				servingsState,
				instructionsState,
				ingredientsState,
				formValid,
				addIngredient,
				removeIngredient,
				resetForm,
				onCancel,
				onSubmit
			};
		}
};
</script>

<template>
	<div class="container mt-4 d-flex flex-column align-items-center justify-content-center" style="max-width: 600px;">
		<h1 class="mb-3">Create a New Recipe</h1>
		<p class="mb-4 text-center">Here you will be able to add your own recipe to the collection.</p>
		<b-alert v-if="success" show variant="success" dismissible @dismissed="success = ''" class="mb-3 w-100">
			{{ success }}
		</b-alert>
		<b-button variant="success" @click="() => { showModal = true; success = '' }" class="mb-3">Create Recipe</b-button>
		<b-modal v-model="showModal" title="Create Recipe" @hide="resetForm" hide-footer>
			<b-form @submit.prevent="onSubmit">
				<b-form-group label="Title" label-for="title" :state="titleState">
					<b-form-input id="title" v-model="form.title" :state="titleState" required />
					<b-form-invalid-feedback>Title is required.</b-form-invalid-feedback>
				</b-form-group>
				<b-form-group label="Image URL" label-for="image">
					<b-form-input id="image" v-model="form.image" placeholder="https://..." />
				</b-form-group>
				<b-form-group label="Ready In Minutes" label-for="readyInMinutes" :state="minutesState">
					<b-form-input id="readyInMinutes" v-model.number="form.readyInMinutes" type="number" min="1" :state="minutesState" required />
					<b-form-invalid-feedback>Required and must be a positive number.</b-form-invalid-feedback>
				</b-form-group>
				<b-form-group label="Servings" label-for="servings" :state="servingsState">
					<b-form-input id="servings" v-model.number="form.servings" type="number" min="1" :state="servingsState" required />
					<b-form-invalid-feedback>Required and must be a positive number.</b-form-invalid-feedback>
				</b-form-group>
				<b-form-group label="Ingredients">
					<div v-for="(ingredient, idx) in form.ingredients" :key="idx" class="d-flex mb-2 align-items-center">
						<b-form-input v-model="ingredient.name" placeholder="Name" class="me-2" required style="max-width: 120px" />
						<b-form-input v-model="ingredient.amount" type="number" min="0.01" step="0.01" placeholder="Amount" class="me-2" required style="max-width: 90px" />
						<b-form-input v-model="ingredient.unit" placeholder="Unit" class="me-2" style="max-width: 90px" />
						<b-button size="sm" variant="danger" @click="removeIngredient(idx)" v-if="form.ingredients.length > 1">&times;</b-button>
					</div>
					<b-button size="sm" variant="outline-success" @click="addIngredient">Add Ingredient</b-button>
					<b-form-invalid-feedback v-if="!ingredientsState">At least one ingredient is required and all must be filled.</b-form-invalid-feedback>
				</b-form-group>
				<b-form-group label="Instructions" label-for="instructions" :state="instructionsState">
					<b-form-textarea id="instructions" v-model="form.instructions" rows="4" :state="instructionsState" required />
					<b-form-invalid-feedback>Instructions are required.</b-form-invalid-feedback>
				</b-form-group>
				<b-form-group label="Cuisines">
					<b-form-select v-model="form.cuisines" :options="cuisines" multiple />
				</b-form-group>
				<b-form-group label="Diets">
					<b-form-select v-model="form.diets" :options="diets" multiple />
				</b-form-group>
				<b-form-group label="Intolerances">
					<b-form-select v-model="form.intolerances" :options="intolerancesList" multiple />
				</b-form-group>
				<b-form-group label="Dietary Flags">
					<div class="d-flex gap-3">
						<b-form-checkbox v-model="form.vegan">Vegan</b-form-checkbox>
						<b-form-checkbox v-model="form.vegetarian">Vegetarian</b-form-checkbox>
						<b-form-checkbox v-model="form.glutenFree">Gluten Free</b-form-checkbox>
					</div>
				</b-form-group>
				<b-alert v-if="error" show variant="danger" class="mb-2">{{ error }}</b-alert>
				<div class="d-flex justify-content-end mt-3">
					<b-button variant="secondary" @click="onCancel" class="me-2">Cancel</b-button>
					<b-button variant="success" type="submit" :disabled="loading || !formValid">{{ loading ? 'Saving...' : 'Save' }}</b-button>
				</div>
			</b-form>
		</b-modal>
	</div>
</template>
<style scoped>
</style>
























