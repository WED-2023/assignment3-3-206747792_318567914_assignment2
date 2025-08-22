<template>
			<div class="family-bg">
				<div class="family-main-card">
					<div class="family-header-area">
						<h1 class="family-main-title">
							Join us in the <span class="family-highlight">taste</span> of tradition
						</h1>
						<p class="family-subtitle">A collection of recipes passed down through our family generations</p>
					</div>
								<div class="family-recipes-blog">
									<div v-for="recipe in familyRecipes" :key="recipe.title" class="family-recipe-blog">
										<h2 class="family-recipe-title">{{ recipe.title }}</h2>
										<div class="family-badges-row">
											<span class="family-badge-pill family-badge-green">{{ recipe.familyMember }}</span>
											<span class="family-badge-pill family-badge-light">{{ recipe.occasion }}</span>
										</div>
										<div class="family-blog-imgs">
											<img v-if="recipe.image" :src="recipe.image" class="family-recipe-img-main" :alt="'Image of ' + recipe.title" />
											<img v-if="recipe.prepImage" :src="recipe.prepImage" class="family-recipe-img-prep" :alt="'Preparation steps for ' + recipe.title" />
										</div>
										<div class="family-details-row">
											<section class="family-instructions-collapse always-open" dir="rtl" style="text-align:right">
												<h3>רכיבים</h3>
												<ul style="direction:rtl; text-align:right">
													<li v-for="(ing, idx) in recipe.ingredients" :key="idx">{{ ing }}</li>
												</ul>
											</section>
											<section class="family-instructions-collapse always-open" dir="rtl" style="text-align:right">
												<h3>אופן הכנה</h3>
												<ol style="direction:rtl; text-align:right">
													<li v-for="(step, idx) in recipe.instructions" :key="idx">{{ step }}</li>
												</ol>
											</section>
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
															title: "קציצות של סבתא רחל",
															familyMember: "סבתא רחל",
															occasion: "בכל יום שישי בצהריים, כחלק מהכנות לשבת",
															image: require("@/assets/meatballs.png"),
															prepImage: require("@/assets/meatballs2.png"),
															ingredients: [
																"500 גרם בשר טחון (בקר או הודו)",
																"בצל בינוני קצוץ דק",
																"2 פרוסות חלה מושרות במים",
																"1 ביצה",
																"חופן כוסברה קצוצה",
																"כף רסק עגבניות",
																"מלח, פלפל, כמון לפי הטעם",
																"שמן זית לטיגון"
															],
															instructions: [
																"מערבבים היטב את כל החומרים בקערה עד שנוצר תערובת אחידה.",
																"יוצרים קציצות בגודל בינוני.",
																"מטגנים קלות מכל צד עד שהקציצות מזהיבות.",
																"מוסיפים לסיר רוטב עגבניות פשוט (רסק, מים ותיבול) ומבשלים יחד כ־30 דקות.",
																"מגישים עם אורז לבן או פירה."
															]
														},
														{
															title: "פסטה של אמא יעל",
															familyMember: "אמא יעל",
															occasion: "בארוחות ערב משפחתיות באמצע השבוע, בעיקר כשצריך מנה מהירה",
															image: require("@/assets/pasta.png"),
															prepImage: require("@/assets/pasta2.png"),
															ingredients: [
																"חבילת פסטה קצרה (פנה או פרפרים)",
																"2 כפות שמן זית",
																"3 שיני שום פרוסות",
																"עגבניות שרי חצויות (כוס וחצי)",
																"בזיליקום טרי",
																"חצי כוס פרמזן מגורר",
																"מלח ופלפל"
															],
															instructions: [
																"מבשלים את הפסטה לפי הוראות האריזה עד ל־al dente.",
																"במחבת גדולה מחממים שמן זית ומטגנים קלות את השום.",
																"מוסיפים עגבניות שרי ומבשלים עד שהן מתרככות ומשחררות נוזלים.",
																"מוסיפים את הפסטה למחבת, מתבלים במלח ופלפל ומערבבים היטב.",
																"מפזרים מעל בזיליקום ופרמזן ומגישים חם."
															]
														},
														{
															title: "עוגת הדבש של דודה מרים",
															familyMember: "דודה מרים",
															occasion: "בראש השנה ובימי הולדת במשפחה",
															image: require("@/assets/cake.png"),
															prepImage: require("@/assets/cake2.png"),
															ingredients: [
																"3 ביצים",
																"כוס סוכר חום",
																"כוס דבש",
																"חצי כוס שמן",
																"2.5 כוסות קמח",
																"שקית אבקת אפייה",
																"כפית קינמון",
																"חצי כפית ג’ינג’ר טחון",
																"כוס תה שחור חזק (מצונן)"
															],
															instructions: [
																"מקציפים ביצים עם סוכר עד לקבלת תערובת תפוחה.",
																"מוסיפים בהדרגה דבש ושמן תוך ערבוב.",
																"מנפים פנימה את הקמח, אבקת האפייה והתבלינים.",
																"מוסיפים את התה בהדרגה עד שהתערובת חלקה.",
																"יוצקים לתבנית משומנת ואופים ב־170 מעלות כ־40–45 דקות.",
																"מגישים עם כוס תה חם בערב חגיגי."
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
	.family-recipes-blog {
		display: flex;
		flex-direction: column;
		gap: 3.5em;
		margin-top: 1.5em;
		width: 100%;
		align-items: center;
	}
	.family-recipe-blog {
		background: #f8fff8;
		border-radius: 2em;
		box-shadow: 0 2px 12px 0 rgba(60, 80, 60, 0.07);
		padding: 2.2em 2.2em 1.7em 2.2em;
		width: 100%;
		max-width: 600px;
		display: flex;
		flex-direction: column;
		align-items: center;
		transition: box-shadow 0.2s;
	}
	.family-recipe-blog:hover {
		box-shadow: 0 6px 24px 0 rgba(60, 80, 60, 0.13);
	}
	.family-blog-imgs {
		display: flex;
		flex-direction: column;
		gap: 0.7em;
		align-items: center;
		margin-bottom: 1em;
		width: 100%;
	}
	.family-recipe-img-main {
		width: 100%;
		max-width: 350px;
		max-height: 200px;
		object-fit: cover;
		border-radius: 1.2em;
		box-shadow: 0 1px 6px 0 rgba(60, 80, 60, 0.08);
	}
	.family-recipe-img-prep {
		width: 100%;
		max-width: 350px;
		max-height: 120px;
		object-fit: cover;
		border-radius: 1.2em;
		box-shadow: 0 1px 6px 0 rgba(60, 80, 60, 0.08);
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
