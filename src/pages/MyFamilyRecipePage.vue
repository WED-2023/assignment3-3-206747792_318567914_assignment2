<template>
			<div class="family-bg">
				<div class="family-main-card">
					<div class="family-header-area">
						<h1 class="family-main-title">
							Join us in the <span class="family-highlight">taste</span> of tradition
						</h1>
						<p class="family-subtitle">A collection of recipes passed down through our family generations</p>
					</div>
					<div class="family-recipes-grid">
						<div v-for="recipe in familyRecipes" :key="recipe.title" class="family-recipe-card">
							<div class="family-img-wrap">
								<img v-if="recipe.image" :src="recipe.image" class="family-recipe-img" :alt="'Image of ' + recipe.title" />
							</div>
							<div class="family-recipe-info">
								<h3 class="family-recipe-title">{{ recipe.title }}</h3>
								<div class="family-badges-row">
									<span class="family-badge-pill family-badge-green">{{ recipe.familyMember }}</span>
									<span class="family-badge-pill family-badge-light">{{ recipe.occasion }}</span>
								</div>
								<div class="family-details-row">
									<details class="family-instructions-collapse">
										<summary>Ingredients</summary>
										<ul>
											<li v-for="(ing, idx) in recipe.ingredients" :key="idx">{{ ing }}</li>
										</ul>
									</details>
									<details class="family-instructions-collapse">
										<summary>Preparation</summary>
										<ol>
											<li v-for="(step, idx) in recipe.instructions" :key="idx">{{ step }}</li>
										</ol>
									</details>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
</template>

<script>
export default {
	name: "MyFamilyRecipePage",
		data() {
			return {
				familyRecipes: [
					{
						title: "Grandma Rachel's Kubbeh",
						familyMember: "Grandma Rachel",
						occasion: "Holidays and family gatherings",
						image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
						ingredients: [
							"500g fine bulgur",
							"500g ground beef",
							"1 large onion, chopped",
							"Salt, pepper, cumin, paprika",
							"Oil for frying"
						],
						instructions: [
							"Soak the bulgur in hot water for 20 minutes and squeeze well.",
							"Mix the bulgur with beef, onion, and spices.",
							"Form balls and fill with seasoned meat.",
							"Deep fry until golden brown."
						]
					},
					{
						title: "Aunt Esther's Apple Cake",
						familyMember: "Aunt Esther",
						occasion: "Rosh Hashanah and every Shabbat",
						image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80",
						ingredients: [
							"3 apples, peeled and diced",
							"2 eggs",
							"1 cup sugar",
							"1/2 cup oil",
							"1.5 cups flour",
							"1 packet baking powder",
							"Cinnamon"
						],
						instructions: [
							"Beat eggs with sugar.",
							"Add oil, flour, baking powder, and cinnamon.",
							"Fold in the apples.",
							"Bake at 180°C for about 40 minutes."
						]
					},
					{
						title: "Grandpa Jacob's Chicken Soup",
						familyMember: "Grandpa Jacob",
						occasion: "Shabbat and winter",
						image: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80",
						ingredients: [
							"1 whole chicken",
							"2 carrots",
							"2 potatoes",
							"1 onion",
							"Celery, parsley",
							"Salt, pepper"
						],
						instructions: [
							"Place all ingredients in a large pot with water.",
							"Bring to a boil and simmer for about 1.5 hours.",
							"Season to taste and serve hot."
						]
					}
				]
			};
		}
};
</script>

<style scoped>

.family-bg {
	min-height: 100vh;
	background: linear-gradient(120deg, #f6faf6 60%, #e6f7d9 100%);
	display: flex;
	align-items: flex-start;
	justify-content: center;
	padding: 2.5rem 0;
}
.family-main-card {
	background: #fff;
	border-radius: 2.5rem;
	max-width: 1100px;
	width: 100%;
	padding: 2.5rem 2.5rem 2rem 2.5rem;
	box-shadow: 0 4px 32px 0 rgba(60, 80, 60, 0.10);
	display: flex;
	flex-direction: column;
	align-items: center;
}
.family-header-area {
	text-align: center;
	margin-bottom: 2.2rem;
}
.family-main-title {
	font-size: 2.7rem;
	font-weight: 700;
	color: #222;
	margin-bottom: 0.5rem;
	letter-spacing: -1px;
}
.family-highlight {
	background: #e6f7d9;
	color: #3a6c2f;
	border-radius: 1.2em;
	padding: 0.1em 0.5em;
	font-weight: 700;
	font-size: 1.1em;
	box-shadow: 0 2px 8px 0 rgba(60, 80, 60, 0.07);
}
.family-subtitle {
	color: #5a6e5a;
	font-size: 1.18rem;
	margin-bottom: 0.2rem;
}
.family-recipes-grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
	gap: 2.2em;
	margin-top: 1.5em;
	width: 100%;
}
.family-recipe-card {
	background: #f8fff8;
	border-radius: 2em;
	box-shadow: 0 2px 12px 0 rgba(60, 80, 60, 0.07);
	padding: 1.5em 1.5em 1.2em 1.5em;
	display: flex;
	flex-direction: column;
	align-items: center;
	min-height: 370px;
	transition: box-shadow 0.2s;
}
.family-recipe-card:hover {
	box-shadow: 0 6px 24px 0 rgba(60, 80, 60, 0.13);
}
.family-img-wrap {
	width: 100%;
	display: flex;
	justify-content: center;
	margin-bottom: 0.8em;
}
.family-recipe-img {
	width: 100%;
	max-width: 220px;
	max-height: 140px;
	object-fit: cover;
	border-radius: 1.2em;
	box-shadow: 0 1px 6px 0 rgba(60, 80, 60, 0.08);
}
.family-recipe-info {
	width: 100%;
	text-align: center;
}
.family-recipe-title {
	font-size: 1.22em;
	font-weight: 700;
	color: #2a3d2a;
	margin-bottom: 0.5em;
}
.family-badges-row {
	display: flex;
	gap: 0.7em;
	justify-content: center;
	margin-bottom: 0.7em;
}
.family-badge-pill {
	display: inline-block;
	border-radius: 2em;
	padding: 0.3em 1.2em;
	font-size: 1em;
	font-weight: 600;
	box-shadow: 0 1px 4px 0 rgba(60, 80, 60, 0.06);
}
.family-badge-green {
	background: #b6e6a7;
	color: #3a6c2f;
}
.family-badge-light {
	background: #e6f7d9;
	color: #3a6c2f;
}
.family-details-row {
	display: flex;
	flex-direction: column;
	gap: 0.7em;
	margin-top: 0.5em;
}
.family-instructions-collapse {
	text-align: left;
	background: #fff;
	border-radius: 1em;
	box-shadow: 0 1px 4px 0 rgba(60, 80, 60, 0.04);
	padding: 0.5em 1em;
	margin-bottom: 0.2em;
}
.family-instructions-collapse summary {
	cursor: pointer;
	color: #3a6c2f;
	font-weight: 600;
	font-size: 1.05em;
	outline: none;
	border-radius: 0.7em;
	padding: 0.2em 0.7em;
	background: #e6f7d9;
	margin-bottom: 0.3em;
}
.family-instructions-collapse[open] summary {
	background: #b6e6a7;
}
@media (max-width: 700px) {
	.family-main-card {
		padding: 1.2rem 0.5rem 1rem 0.5rem;
	}
	.family-recipes-grid {
		grid-template-columns: 1fr;
		gap: 1.2em;
	}
}
</style>
