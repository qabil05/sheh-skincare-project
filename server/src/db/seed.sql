USE sheh;

INSERT INTO categories(id,name,slug) VALUES
(1,'Serum','serum'),(2,'Moisturizer','moisturizer'),(3,'Cleanser','cleanser'),(4,'Essence','essence'),(5,'Balm','balm'),(6,'Facial Oil','facial-oil'),(7,'Toner','toner'),(8,'Emulsion','emulsion'),(9,'Eye Care','eye-care')
ON DUPLICATE KEY UPDATE name=VALUES(name), slug=VALUES(slug);

INSERT INTO products(id,name,slug,short_description,full_description,price,category_id,hero_image,texture_image,usage_instructions,featured) VALUES
(1,'Renewal Serum','renewal-serum','A weightless botanical serum that leaves skin feeling quiet, supple and fresh.','A lucid daily serum built around layered hydration, soft botanical extracts and a silk-light finish.',68,1,'/images/products/detail/renewal-serum.webp','/images/products/story/renewal-serum-macro.webp','Press 2–3 drops into clean, slightly damp skin.',1),
(2,'Quiet Moisture Cream','quiet-moisture-cream','A cushiony cream with a calm finish and a soft veil of lasting comfort.','A plush daily moisturizer with a cloud-soft slip.',58,2,'/images/products/detail/quiet-moisture-cream.webp','/images/products/story/quiet-moisture-cream-texture.webp','Warm a small amount between fingertips and press over face and neck.',1),
(3,'Botanical Cleansing Gel','botanical-cleansing-gel','A translucent gel cleanser made for a fresh rinse and comfortable after-feel.','A clear, low-foam cleansing gel with a water-first texture.',42,3,'/images/products/detail/botanical-cleansing-gel.webp','/images/products/story/botanical-cleansing-gel-texture.webp','Massage one pump over damp skin and rinse.',1),
(4,'Velvet Dew Essence','velvet-dew-essence','A feather-light essence with a dewy slip and a clean, glassy finish.','A mist-light veil for skin that loves layers.',54,4,'/images/products/detail/velvet-dew-essence.webp','/images/textures/water.webp','Pat a few drops onto clean skin before serum.',0),
(5,'Restorative Night Balm','restorative-night-balm','A buttery closing layer for slower evenings and cocoon-soft skin.','A balm-to-cream finish for the final step of an evening ritual.',64,5,'/images/products/detail/restorative-night-balm.webp','/images/textures/cream.webp','Melt a pea-sized amount between palms and press onto face.',0),
(6,'Soft Root Facial Oil','soft-root-facial-oil','A satin botanical oil with a warm, effortless finish and no heavy residue.','A small-batch inspired face oil built around quiet botanical richness.',62,6,'/images/products/detail/soft-root-facial-oil.webp','/images/textures/serum.webp','Press 1–2 drops over moisturizer.',0),
(7,'Cloud Milk Toner','cloud-milk-toner','A milky first layer that settles onto skin with a fresh, weightless cushion.','A soft toner balanced between water and lotion.',48,7,'/images/products/detail/cloud-milk-toner.webp','/images/textures/water.webp','Press into clean skin before serum or essence.',0),
(8,'Petal Recovery Emulsion','petal-recovery-emulsion','A fluid cream-emulsion that leaves a sheer veil of soft botanical comfort.','A light, cushiony emulsion with a satin after-feel.',56,8,'/images/products/detail/petal-recovery-emulsion.webp','/images/textures/cream.webp','Smooth one to two pumps over face and neck after serum.',0),
(9,'Morning Eye Concentrate','morning-eye-concentrate','A silky eye concentrate for the small bright ritual before the rest of the day.','A light eye treatment designed for cool fingertips and early daylight.',52,9,'/images/products/detail/morning-eye-concentrate.webp','/images/textures/serum.webp','Tap a rice-grain amount around the orbital area.',0)
ON DUPLICATE KEY UPDATE name=VALUES(name),short_description=VALUES(short_description),full_description=VALUES(full_description),price=VALUES(price),category_id=VALUES(category_id),hero_image=VALUES(hero_image),texture_image=VALUES(texture_image),usage_instructions=VALUES(usage_instructions),featured=VALUES(featured);

INSERT INTO ingredients(id,name,short_benefit,description,image) VALUES
(1,'Aloe Water','Fresh hydration','A clean translucent base note inspired by freshly cut aloe.','/images/ingredients/aloe-water.webp'),
(2,'Camellia Petal','Soft comfort','A delicate botanical story built around petal softness and dew.','/images/ingredients/camellia-petals.webp'),
(3,'Citrus Water','Bright sensorial note','A luminous ingredient story built around peel and water.','/images/ingredients/citrus-water.webp'),
(4,'Root Extract','Grounded nourishment','Earthy botanical character translated into a light daily ritual.','/images/ingredients/root-extract.webp'),
(5,'Snow Mushroom','Moisture support','A water-loving botanical expressed through a translucent gel texture.','/images/textures/gel.webp'),
(6,'Botanical Infusion','Modern formulation','Measured extracts, clear glass and fresh leaves in a modern botanical language.','/images/ingredients/botanical-laboratory.webp')
ON DUPLICATE KEY UPDATE name=VALUES(name),short_benefit=VALUES(short_benefit),description=VALUES(description),image=VALUES(image);

INSERT IGNORE INTO product_ingredients(product_id,ingredient_id) VALUES
(1,1),(1,5),(2,2),(3,1),(4,5),(5,2),(6,4),(7,5),(8,2),(9,3);

INSERT INTO journal_posts(id,title,slug,excerpt,content,cover_image) VALUES
(1,'Water, Light & Skin','water-light-and-skin','A closer look at the clear, fluid textures that shape the Sheh idea of hydration.','An editorial Sheh journal essay about water, light and tactile hydration.','/images/journal/hydration.webp'),
(2,'The Art of a Quieter Morning','the-art-of-a-quieter-morning','A slower first ten minutes can change the entire rhythm of a routine.','An editorial Sheh journal essay about light, texture and pace.','/images/journal/slow-ritual.webp'),
(3,'Botanical Science, Softly Told','botanical-science-softly-told','Where clear glass, botanical extracts and tactile formulas meet without feeling clinical.','An editorial Sheh journal essay about modern botanical formulation.','/images/journal/botanical-science.webp')
ON DUPLICATE KEY UPDATE title=VALUES(title),slug=VALUES(slug),excerpt=VALUES(excerpt),content=VALUES(content),cover_image=VALUES(cover_image);
