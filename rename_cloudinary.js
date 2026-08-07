const cloudinary = require('cloudinary').v2;
require('dotenv').config({ path: '.env.local' });
const path = require('path');

cloudinary.config({
  cloud_name: "dpsufnobu",
  api_key: "977678752395666",
  api_secret: "C0l1R1COgFsw-rxZ-oqdJWkravg"
});

const skuMappings = {
  "PRSCE11CROSEASTMRFM2": { main: "Cross_Easton_Marfil.jpg", alt: "Cross_Easton_Marfil_2.jpg", env: "Ambiente_Cross_Easton.jpg" },
  "PRSCE12CROSEASTCRMT2": { main: "Cross_Easton_Crema.jpg", alt: "Cross_Easton_Crema_2.jpg" },
  "PRSCE11BIANCOSIBGRG2": { main: "Bianco_Siberia_Greige.jpg", alt: "Bianco_Siberia_Greige_2.jpg", env: "Ambiente_Bianco_Siberia.jpg" },
  "PRSCE11ALMAWHTMT2A": { main: "Alma_White.jpg", alt: "Alma_White_2.jpg" },
  "PRSCEPRESTGPRLMT2A": { main: "prestige_pearl.jpg", alt: "prestige_pearl2.jpg" },
  "PRSCE61PRESTGWHTMT2A": { main: "prestige_white.jpg", alt: "prestige_white2.jpg" },
  "PRSCE11PRESTGSND2A": { main: "prestige_sand.jpg", alt: "prestige_sand2.jpg" },
  "PRSCE61CHEVRLVTEMT2A": { main: "rlv_chevron_terra.jpg", alt: "rlv_chevron_terra2.jpg", env: "Ambiente_RLV_Chevron_Terra.jpg" },
  "PRSCE61TRAVALMDMT2A": { main: "travertino_almond.jpg", alt: "travertino_almond2.jpg" },
  "PRSCE61MERYGLDBR2A": { main: "mery_gold.jpg", alt: "mery_gold2.jpg" },
  "PRSCE61NORSNDMTRC2A": { main: "NORWICH_SAND_MATE.jpg", alt: "Norwich_sand_mate_2.jpg" },
  "PRSCE61SENAPRLRMTC2": { main: "sena_perla.jpg", alt: "sena_perla2.jpg" },
  "PRSCE61SENALABBLCMT2": { main: "Lab_Sena_Blanco.jpg", alt: "Lab_Sena_Blanco_2.jpg" },
  "AGGR23MAGICMAF1A": { main: "magic_beige.jpg", alt: "magic_beige2.jpg" },
  "AGGR23MAGICVIO1A": { main: "magic_voilet.jpg", alt: "magic_voilet2.jpg" },
  "AGGR33ATRISAV1A": { main: "Atrium_Savanna.jpg", alt: "Atrium_Savanna_2.jpg" },
  "AGGR33BASCFI": { main: "Basic_Cafe.jpg", alt: "Basic_Cafe_2.jpg" },
  "AGGR33BASROS1A": { main: "Basic_Rosa.jpg", alt: "Basic_Rosa_2.jpg" },
  "AGGR33GLITCHCO1A": { main: "Gliter_Chocolate.jpg", alt: "Gliter_Chocolate_2.jpg" },
  "AGGR33TEMMUS1A": { main: "tempo_musgo.jpg", alt: "tempo_musgo2.jpg" },
  "BTCK15OHIOCPCHM1A": { main: "ohio_capuchino.jpg", alt: "ohio capuchino2.jpg" },
  "BTCK15OHIOMSG1A": { main: "ohio_musgo.jpg", alt: "ohio_musgo2.jpg" },
  "BTCK15TRNTALTMR1A": { main: "toronto_altamira.jpg", alt: "toronto_altamira2.jpg" },
  "BTCK15TRNTCRM1A": { main: "toronto_crema.jpg", alt: "toronto_crema2.jpg" },
  "BTCK15TRNTGRY1A": { main: "toronto_gray.jpg", alt: "toronto_gray2.jpg" },
  "BTPC13TIZCRM1A": { main: "tiziano_crema.jpg", alt: "tiziano_crema2.jpg", env: "Ambiente_Tiziano_Crema.jpg" },
  "BTPC13TIZNGR1A": { main: "tiziano_negro.jpg", alt: "tiziano_negro2.jpg" },
  "BTPC13TIZRST1A": { main: "tiziano_rustic.jpg", alt: "tiziano_rustic2.jpg" },
  "BTPC13TIZUMB1A": { main: "tiziano_umbral.jpg", alt: "tiziano_umbral2.jpg" },
  "BTPC72MDRZBLCK1A": { main: "Madrazo_Black.jpg", alt: "Madrazo_Black_2.jpg" },
  "BTPC72MDRZGRY1A": { main: "Madrazo_Grey.jpg", alt: "Madrazo_Grey_2.jpg", env: "Ambiente_Madrazo_grey.jpg" },
  "BTPC72TIZDRK1A": { main: "tiziano_dark.jpg", alt: "tiziano_dark2.jpg" },
  "CFGR33ESSEBEG1A": { main: "Essence_Beige.jpg", alt: "Essence_Beige_2.jpg" },
  "CFGR33ESSENBLCK1A": { main: "Essence_Black.jpg", alt: "Essence_Black_2.jpg" },
  "CFGR33ESSERED1A": { main: "Essence_Rojo.jpg", alt: "Essence_Rojo_2.jpg" },
  "CKA66SANTEMATT": { main: "sante.jpg", alt: "sante2.jpg" },
  "CKA66TERRDARMAT": { main: "terrazo_dark_matte.jpg", alt: "terrazo_dark_matte2.jpg" },
  "CKA66TERRDARPOL": { main: "terrazo_dark_polished.jpg", alt: "terrazo_dark_polished2.jpg" },
  "CKA66THAMWHMMA1": { main: "thames_white.jpg", alt: "thames_white2.jpg", env: "Ambiente_Thames_White.jpg" },
  "CKA60SUDGRISMAT": { main: "udine_gris_matte.jpg", alt: "udine_gris_matte2.jpg" },
  "CKA60URBOCREPOL": { main: "urbino_crema.jpg", alt: "urbino_crema2.jpg" },
  "EOCK20RITUAL1A": { main: "ritual_brillo.jpg", alt: "ritual_brillo2.jpg", env: "Ambiente_Ritual.jpg" },
  "EOCK20SARIBLL1A": { main: "sari_blanco_brillo.jpg", alt: "sari_blanco_brillo2.jpg" },
  "EDCK20CRECIELO1A": { main: "Creta_Cielo.jpg", alt: "Creta_Cielo_2.jpg" },
  "EUTGR44FORESTHAY1A": { main: "Forestal_Haya.jpg", alt: "Forestal_Haya_2.jpg" },
  "EUTGR44NORWAYHON1A": { main: "norway_honey.jpg", alt: "norway_honey2.jpg" },
  "EUTGR44PARISBGE1A": { main: "paris_beige.jpg", alt: "paris_beige2.jpg" },
  "EUTGR44PIEDRAMF1A": { main: "piedra_marfil.jpg", alt: "piedra_marfil2.jpg" },
  "GRESPAVALB1A": { main: "porcelanico_albarracin_gris_mate.jpg", alt: "porcelanico_albarracin_gris_mate2.jpg" },
  "KBRP33SYBARCARR4": { main: "sybaris_carrara.jpg", alt: "sybaris_carrara2.jpg" },
  "MXGK120BKWBLA1A": { main: "Beko_Blanco.jpg", alt: "Beko_Blanco_2.jpg" },
  "MXGK120SIDWYWH1A": { main: "sidney_white.jpg", alt: "sidney_white2.jpg" },
  "NBG44NENI1A": { main: "neni_pav.jpg", alt: "neni_pav2.jpg" },
  "ONCK20SARIGRIS1A": { main: "sari_gris_brillo.jpg", alt: "sari_gris_brillo2.jpg" },
  "ONCK20SARIMFL1A": { main: "sari_marfi_brillo.jpg", alt: "sari_marfi_brillo2.jpg" },
  "ONCK20URBMOSBGE1A": { main: "urbis_mosaico_beige.jpg", alt: "urbis_mosaico_beige2.jpg", env: "Ambiente_Urbis_Mosaico_Beige.jpg" },
  "ONCK20URBMOSPRL1A": { main: "Ambiente_Urbis_Mosaico_Perla.jpg", alt: "Ambiente_Urbis_Mosaico_Perla_2.jpg" },
  "ONCK44TUSBNC1A": { main: "tuscany_white.jpg", alt: "tuscany_white2.jpg" },
  "ONCK44URBPRL1A": { main: "urbis_perla.jpg", alt: "urbis_perla2.jpg", env: "Ambiente_Urbis_Perla.jpg" },
  "PDG33DELICABG1A": { main: "Delicate_Beige.jpg", alt: "Delicate_Beige_2.jpg" },
  "PDG33SAIRAM1A": { main: "saira_m.jpg", alt: "saira_m2.jpg" },
  "PDG33CORSOT2A": { main: "Corso_T.jpg", alt: "Corso_T_2.jpg" },
  "PDG33HOMS3C1A": { main: "Homs_C.jpg", alt: "Homs_C_2.jpg" },
  "PDG33KEVNOIR1A": { main: "Kiev_Noir.jpg", alt: "Kiev_Noir_2.jpg" },
  "PDG33NEBEKB1A": { main: "nebek_b.jpg", alt: "nebek_b2.jpg" },
  "PDG33VIVACIPR1A": { main: "vivacity_pr.jpg", alt: "vivacity_pr2.jpg" },
  "PDG33OMIXB1A": { main: "omix_b.jpg", alt: "omix_b2.jpg" },
  "PRSCK44BONOACR1A": { main: "Bonova_Ocre.jpg", alt: "Bonova_Ocre_2.jpg", env: "Ambiente_Bonova_Ocre.jpg" },
  "PRSCK44BONOSAND1A": { main: "Bonova_Sand.jpg", alt: "Bonova_Sand_2.jpg", env: "Ambiente_Bonova_Sand.jpg" },
  "PRSCK44PIETMIX1A": { main: "pietra_mix.jpg", alt: "pietra_mix2.jpg", env: "Ambiente_Pietra_Mix.jpg" },
  "PRSCD60BEKOBLC1A": { main: "Beko_Blanco.jpg", alt: "Beko_Blanco_2.jpg" },
  "PRSCK60BLKNBLL1A": { main: "Balkan_Blanco.jpg", alt: "Blakan_Blanco_2.jpg", env: "Ambiente_balkan.jpg" },
  "PRSCK60BLKNMRF1A": { main: "Balkan_Marfi.jpg", alt: "Balkan_Marfi_2.jpg" },
  "PRSCK60BLKNPRL1A": { main: "Balkan_Perla.jpg", alt: "Balkan_Perla_2.jpg" },
  "PRSCK60MAESE1A": { main: "maese_brillo.jpg", alt: "maese_brillo2.jpg" },
  "ONCK44TUSNOC11A": { main: "tuscany_noce_mate.jpg", alt: "tuscany_noce_mate2.jpg" },
  "CKA60URBDARMAT": { main: "urbino_dark.jpg", alt: "urbino_dark2.jpg" },
  "ONCK45PUNCAN1A": { main: "punta_cana_beige.jpg", alt: "punta_cana_beige2.jpg" },
  "CKA60MACGRISMAT": { main: "Macael_Gris.jpg", alt: "Macael_Gris_2.jpg" }
};

async function renameImage(filename, sku, suffix) {
  const fromPublicId = `products_unmapped/${path.parse(filename).name}`;
  const toPublicId = `products/${sku}_${suffix}`;

  try {
    const result = await cloudinary.uploader.rename(fromPublicId, toPublicId, { overwrite: true });
    console.log(`Renamed: ${fromPublicId} -> ${toPublicId}`);
    return true;
  } catch (error) {
    if (error.message.includes('not found')) {
      // It might have already been moved to products/ by the Excel script
      // Or it might not exist at all
    } else {
      console.log(`Error renaming ${filename}: ${error.message}`);
    }
    return false;
  }
}

async function run() {
  let successCount = 0;
  for (const [sku, files] of Object.entries(skuMappings)) {
    if (files.main) {
      if (await renameImage(files.main, sku, 'main')) successCount++;
    }
    if (files.alt) {
      if (await renameImage(files.alt, sku, 'alt')) successCount++;
    }
    if (files.env) {
      if (await renameImage(files.env, sku, 'env')) successCount++;
    }
  }
  
  console.log(`\nFinished! Successfully renamed ${successCount} missing images on Cloudinary.`);
}

run();
