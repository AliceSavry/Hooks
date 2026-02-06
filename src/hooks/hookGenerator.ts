// Générateur de hooks viraux avec 500+ combinaisons possibles
// Génère des phrases complètes et naturelles en français

export interface GeneratedHook {
  id: string;
  hook: string;
  category: string;
  categoryEmoji: string;
  explanation: string;
  intensity: number; // 1-5 : intensité du hook
}

export interface HookCategory {
  id: string;
  name: string;
  emoji: string;
  color: string;
  description: string;
}

export const hookCategories: HookCategory[] = [
  { 
    id: 'curiosity', 
    name: "Curiosité & Secret", 
    emoji: "🎯", 
    color: "from-purple-500 to-indigo-600",
    description: "Crée l'envie de savoir avec des secrets et révélations"
  },
  { 
    id: 'negative', 
    name: "Négatif & Erreur", 
    emoji: "❌", 
    color: "from-red-500 to-rose-600",
    description: "Le cerveau réagit plus vite au danger et aux erreurs"
  },
  { 
    id: 'value', 
    name: "Valeur Express", 
    emoji: "📚", 
    color: "from-green-500 to-emerald-600",
    description: "Apprentissage rapide avec des résultats concrets"
  },
  { 
    id: 'storytelling', 
    name: "Storytelling & Action", 
    emoji: "🎬", 
    color: "from-orange-500 to-amber-600",
    description: "Immersion immédiate avec des histoires et défis"
  },
  { 
    id: 'shock', 
    name: "Choc & Controverse", 
    emoji: "⚡", 
    color: "from-yellow-500 to-orange-600",
    description: "Fait réagir avec des opinions fortes et controverses"
  },
];

// Base de données massive de composants linguistiques pour génération naturelle
const linguisticComponents = {
  // Structures de phrases de base (50+ structures)
  structures: [
    // Déclaratif fort
    (topic: string) => `Personne ne vous dit jamais la vérité sur ${topic}.`,
    (topic: string) => `Je viens de découvrir un secret incroyable sur ${topic}.`,
    (topic: string) => `Tout le monde se trompe sur ${topic}, voici pourquoi.`,
    (topic: string) => `Si vous faites encore ça avec ${topic}, arrêtez tout de suite.`,
    (topic: string) => `Il y a un truc que vous ignorez sur ${topic}.`,
    (topic: string) => `La méthode secrète pour dominer ${topic}.`,
    (topic: string) => `Ce que les pros savent sur ${topic} mais ne partagent pas.`,
    (topic: string) => `L'astuce cachée derrière ${topic} que personne ne montre.`,
    (topic: string) => `La vérité brutale sur ${topic} qu'on vous cache.`,
    (topic: string) => `Le système parfait pour maîtriser ${topic}.`,
    
    // Interrogatif engageant
    (topic: string) => `Saviez-vous que ${topic} cache un secret énorme ?`,
    (topic: string) => `Pourquoi personne ne parle de ${topic} ?`,
    (topic: string) => `Est-ce que vous faites cette erreur avec ${topic} ?`,
    (topic: string) => `Vous pensez connaître ${topic} ? Détrompez-vous.`,
    (topic: string) => `Qu'est-ce que ${topic} peut vraiment faire pour vous ?`,
    (topic: string) => `Comment ${topic} peut changer votre vie ?`,
    (topic: string) => `Pourquoi ${topic} ne fonctionne pas comme prévu ?`,
    (topic: string) => `Êtes-vous prêt à découvrir le vrai ${topic} ?`,
    (topic: string) => `Qui vous a menti sur ${topic} ?`,
    (topic: string) => `Que se passerait-il si vous maîtrisiez ${topic} ?`,
    
    // Impératif direct
    (topic: string) => `Arrêtez tout et regardez ce que ${topic} peut faire.`,
    (topic: string) => `Écoutez-moi bien : ${topic} va tout changer pour vous.`,
    (topic: string) => `Ne touchez pas à ${topic} avant d'avoir vu ça.`,
    (topic: string) => `Regardez ce qui arrive quand on maîtrise ${topic}.`,
    (topic: string) => `Testez cette technique sur ${topic} et voyez le résultat.`,
    (topic: string) => `Arrêtez de galérer avec ${topic}, voici la solution.`,
    (topic: string) => `Prenez 2 minutes pour comprendre ${topic}.`,
    (topic: string) => `N'utilisez plus jamais ${topic} comme avant.`,
    (topic: string) => `Changez votre approche de ${topic} dès aujourd'hui.`,
    (topic: string) => `Découvrez la puissance cachée de ${topic}.`,
    
    // Storytelling immersif
    (topic: string) => `Il y a 3 jours, j'ai découvert ${topic} et ma vie a changé.`,
    (topic: string) => `POV : tu réalises soudain que ${topic} est complètement faux.`,
    (topic: string) => `Imaginez : ${topic} mais en 10x plus efficace.`,
    (topic: string) => `Quand j'ai compris ${topic}, tout est devenu clair.`,
    (topic: string) => `L'histoire folle de comment j'ai dompté ${topic}.`,
    (topic: string) => `Ce jour où ${topic} m'a sauvé la vie.`,
    (topic: string) => `Le moment où j'ai cracké le code de ${topic}.`,
    (topic: string) => `Comment ${topic} est devenu mon super-pouvoir.`,
    (topic: string) => `La révélation qui a tout changé sur ${topic}.`,
    (topic: string) => `Mon voyage pour conquérir ${topic}.`,
    
    // Challenge personnel
    (topic: string) => `Je parie que vous ne connaissez pas ce secret sur ${topic}.`,
    (topic: string) => `Vous pensez tout savoir sur ${topic} ? Réponse dans 60 secondes.`,
    (topic: string) => `Défi : terminez cette vidéo sans être choqué par ${topic}.`,
    (topic: string) => `Si vous pensez connaître ${topic}, regardez jusqu'au bout.`,
    (topic: string) => `Je vous mets au défi de ne pas utiliser ${topic} après ça.`,
    (topic: string) => `Testez vos connaissances sur ${topic} en 30 secondes.`,
    (topic: string) => `Prouvez-moi que vous maîtrisez ${topic}.`,
    (topic: string) => `Le challenge ultime pour dominer ${topic}.`,
    (topic: string) => `Êtes-vous assez intelligent pour comprendre ${topic} ?`,
    (topic: string) => `Ne regardez pas si vous n'êtes pas prêt pour ${topic}.`,
  ],
  
  // Modificateurs de sujet
  subjectModifiers: [
    "cette technique de", "ce hack pour", "cette astuce sur", "cette méthode pour",
    "ce secret du", "cette vérité sur le", "cette façon de faire du", "cette erreur avec le",
    "cette découverte sur", "cette manière de", "cette approche du", "ce truc pour",
    "cette stratégie pour", "cette recette du", "cette formule pour", "cette technique du",
    "ce plan pour", "cette solution pour", "cette innovation du", "cette révolution du"
  ],
  
  // Verbes d'action puissants
  actionVerbs: [
    "découvrir", "apprendre", "maîtriser", "comprendre", "résoudre", "éviter", "arrêter",
    "changer", "améliorer", "optimiser", "transformer", "révolutionner", "dominer", "exploser",
    "déchirer", "cracker", "dompter", "conquérir", "contrôler", "gérer", "utiliser", "appliquer",
    "créer", "développer", "innover", "perfectionner", "maximiser", "minimiser", "accélérer",
    "simplifier", "complexifier", "automatiser", "personnaliser", "customiser", "upgrader"
  ],
  
  // Adjectifs intensificateurs
  intensifiers: [
    "incroyable", "secret", "choquant", "interdit", "illégal", "surprenant", "étonnant",
    "stupéfiant", "dérangeant", "révolutionnaire", "magique", "ultime", "définitif", "parfait",
    "imparable", "puissant", "efficace", "radical", "extrême", "brutal", "violent", "intense",
    "exceptionnel", "phénoménal", "extraordinaire", "unique", "rare", "exclusif", "privé",
    "confidentiel", "caché", "occulte", "mystérieux", "énigmatique", "insoupçonné"
  ],
  
  // Adverbes de temps
  timeAdverbs: [
    "maintenant", "aujourd'hui", "immédiatement", "en 2 secondes", "en moins d'une minute",
    "en 24h", "dès maintenant", "tout de suite", "rapidement", "vite", "instantanément",
    "en un clin d'œil", "en un instant", "en quelques secondes", "en 60 secondes",
    "en 5 minutes", "en une heure", "en une journée", "cette semaine", "ce mois-ci"
  ],
  
  // Promesses de résultat
  resultPromises: [
    "pour tout changer", "pour être le meilleur", "pour impressionner tout le monde",
    "pour gagner du temps", "pour économiser de l'argent", "pour avoir l'air d'un pro",
    "pour être populaire", "pour résoudre tous vos problèmes", "pour enfin réussir",
    "pour ne plus jamais galérer", "pour tout comprendre", "pour maîtriser le sujet",
    "pour dominer le jeu", "pour être invincible", "pour briller en société",
    "pour séduire", "pour convaincre", "pour influencer", "pour inspirer",
    "pour créer", "pour innover", "pour progresser", "pour évoluer", "pour transformer"
  ],
  
  // Éléments émotionnels
  emotionalTriggers: [
    "ma vie a changé", "je n'en revenais pas", "j'étais choqué", "je ne m'y attendais pas",
    "c'était dingue", "j'ai tout compris", "ça m'a retourné le cerveau", "je suis tombé de ma chaise",
    "je regrette de ne pas avoir su plus tôt", "c'est un game changer", "mon esprit a explosé",
    "je n'arrive toujours pas à y croire", "c'est trop beau pour être vrai", "ça m'a soufflé",
    "j'ai eu une révélation", "tout s'est éclairé", "le puzzle s'est assemblé",
    "c'était l'élément manquant", "la pièce du puzzle", "le déclic ultime"
  ],
  
  // Contextes sociaux
  socialContexts: [
    "que les pros gardent secret", "que l'école ne vous apprend pas", "que vos amis ne connaissent pas",
    "que les influenceurs cachent", "que personne n'ose dire", "que tout le monde ignore",
    "que les experts utilisent", "que seuls les initiés connaissent", "que les millionnaires appliquent",
    "que les génies comprennent", "que les leaders maîtrisent", "que les winners font",
    "que les losers ignorent", "que les débutants ne savent pas", "que les anciens gardent",
    "que l'industrie cache", "que les médias ne montrent pas", "que les livres n'enseignent pas",
    "que les formations n'expliquent pas", "que les tutos oublient"
  ],
  
  // Préfixes d'accroche
  prefixes: [
    "Attention :", "Choc :", "Révélation :", "Secret :", "Confidentiel :",
    "Urgent :", "Important :", "Incroyable :", "Stupéfiant :", "Dingue :",
    "Je viens de découvrir que", "Sachez que", "Écoutez ça :", "Regardez :",
    "Vous ne devinerez jamais", "Préparez-vous :", "Tenez-vous bien :",
    "Ne partez pas :", "Restez :", "2 secondes :"
  ],
  
  // Suffixes d'urgence
  suffixes: [
    "tout de suite.", "avant qu'il ne soit trop tard.", "sérieusement.", "vraiment.",
    "pour de bon.", "une fois pour toutes.", "definitivement.", "sans retour en arrière.",
    "maintenant ou jamais.", "c'est maintenant ou jamais.", "c'est le moment.",
    "c'est votre dernière chance.", "ne ratez pas ça.", "c'est crucial.",
    "c'est vital.", "c'est essentiel.", "c'est fondamental.", "c'est la base.",
    "c'est la clé.", "c'est le secret."
  ]
};

// Templates spécifiques par catégorie (25+ par catégorie)
const categoryTemplates = {
  curiosity: [
    (topic: string) => `Le secret caché de ${topic} que personne ne veut que vous sachiez.`,
    (topic: string) => `Pourquoi ${topic} est bien plus complexe qu'il n'y paraît ?`,
    (topic: string) => `La vérité choquante sur ${topic} qu'on vous cache depuis toujours.`,
    (topic: string) => `Ce que personne ne vous dit sur ${topic}... mais que vous devez absolument savoir.`,
    (topic: string) => `Le mystère derrière ${topic} enfin révélé.`,
    (topic: string) => `Découvrez le côté obscur de ${topic} que personne ne montre.`,
    (topic: string) => `L'incroyable secret de ${topic} qui va tout changer pour vous.`,
    (topic: string) => `Pourquoi ${topic} fonctionne vraiment (et ce qu'on vous cache).`,
    (topic: string) => `Le code secret pour maîtriser ${topic} en quelques minutes.`,
    (topic: string) => `Ce que l'industrie ne veut pas que vous découvriez sur ${topic}.`,
    (topic: string) => `La révélation interdite sur ${topic} qui va vous choquer.`,
    (topic: string) => `Le truc que les experts gardent secret sur ${topic}.`,
    (topic: string) => `Pourquoi ${topic} est différent de ce qu'on vous a dit ?`,
    (topic: string) => `Le système caché derrière ${topic} que personne ne connaît.`,
    (topic: string) => `La méthode secrète pour comprendre ${topic} en 60 secondes.`,
    (topic: string) => `Ce que ${topic} cache vraiment (préparez-vous).`,
    (topic: string) => `Le puzzle incomplet de ${topic} enfin résolu.`,
    (topic: string) => `La pièce manquante de ${topic} que tout le monde cherche.`,
    (topic: string) => `Pourquoi ${topic} reste un mystère pour la plupart des gens ?`,
    (topic: string) => `Le côté sombre de ${topic} qu'on ne vous montre jamais.`,
    (topic: string) => `La vérité nue sur ${topic} sans filtre.`,
    (topic: string) => `Ce qu'on ne vous dit pas sur ${topic} dans les tutoriels.`,
    (topic: string) => `Le secret bien gardé de ${topic} enfin exposé.`,
    (topic: string) => `La clé cachée pour débloquer ${topic}.`,
    (topic: string) => `L'énigme de ${topic} enfin résolue.`,
  ],
  
  negative: [
    (topic: string) => `L'erreur mortelle que 99% des gens font avec ${topic}.`,
    (topic: string) => `Arrêtez de ruiner ${topic} avec cette technique archaïque.`,
    (topic: string) => `Pourquoi votre approche de ${topic} vous fait perdre du temps ?`,
    (topic: string) => `La pire chose que vous pouvez faire avec ${topic} (et vous le faites sûrement).`,
    (topic: string) => `Comment ${topic} peut détruire vos résultats si vous faites cette erreur.`,
    (topic: string) => `Ne faites plus jamais cette erreur avec ${topic} si vous voulez réussir.`,
    (topic: string) => `Le piège caché de ${topic} que personne ne voit venir.`,
    (topic: string) => `Pourquoi 90% des gens échouent avec ${topic} (et comment l'éviter).`,
    (topic: string) => `Comment ${topic} peut vous faire perdre tout ce que vous avez construit.`,
    (topic: string) => `L'astuce toxique de ${topic} qu'on vous vend comme révolutionnaire.`,
    (topic: string) => `La faille critique de ${topic} que personne ne répare.`,
    (topic: string) => `Pourquoi ${topic} ne marche pas comme prévu (et comment le fixer).`,
    (topic: string) => `L'illusion dangereuse de ${topic} qui vous piège.`,
    (topic: string) => `Le mythe destructeur de ${topic} qu'il faut briser.`,
    (topic: string) => `Comment ${topic} peut saboter vos efforts sans que vous le sachiez.`,
    (topic: string) => `La vérité amère sur ${topic} que personne n'accepte.`,
    (topic: string) => `Pourquoi ${topic} est une perte de temps (la preuve).`,
    (topic: string) => `L'arnaque silencieuse de ${topic} qui vous coûte cher.`,
    (topic: string) => `Le danger caché dans ${topic} que personne ne voit.`,
    (topic: string) => `Comment ${topic} vous empêche d'avancer (sans que vous le réalisiez).`,
    (topic: string) => `La faiblesse fatale de ${topic} exposée.`,
    (topic: string) => `Pourquoi ${topic} est voué à l'échec (et comment y échapper).`,
    (topic: string) => `Le cercle vicieux de ${topic} et comment en sortir.`,
    (topic: string) => `L'obstacle invisible de ${topic} qui bloque votre progression.`,
    (topic: string) => `La menace silencieuse de ${topic} qui plane sur vous.`,
  ],
  
  value: [
    (topic: string) => `Comment maîtriser ${topic} en 3 étapes simples.`,
    (topic: string) => `La technique secrète pour exceller en ${topic} sans effort.`,
    (topic: string) => `Transformez votre approche de ${topic} avec cette méthode simple.`,
    (topic: string) => `Le hack ultime pour devenir un pro en ${topic} rapidement.`,
    (topic: string) => `Comment avoir des résultats incroyables avec ${topic} en 24h.`,
    (topic: string) => `La formule magique pour réussir ${topic} à tous les coups.`,
    (topic: string) => `Apprenez ${topic} 10x plus vite avec cette technique.`,
    (topic: string) => `Le raccourci secret pour maîtriser ${topic} en un temps record.`,
    (topic: string) => `Comment obtenir des résultats professionnels en ${topic} facilement.`,
    (topic: string) => `La méthode infaillible pour progresser rapidement en ${topic}.`,
    (topic: string) => `Le système étape par étape pour dominer ${topic}.`,
    (topic: string) => `La feuille de route pour exceller en ${topic} en 7 jours.`,
    (topic: string) => `Comment passer de débutant à expert en ${topic} rapidement.`,
    (topic: string) => `La technique qui change tout pour ${topic}.`,
    (topic: string) => `Le plan d'action concret pour réussir ${topic}.`,
    (topic: string) => `La méthode scientifique pour optimiser ${topic}.`,
    (topic: string) => `Comment automatiser ${topic} pour gagner du temps.`,
    (topic: string) => `La stratégie gagnante pour ${topic} révélée.`,
    (topic: string) => `Le framework ultime pour ${topic} expliqué simplement.`,
    (topic: string) => `Comment simplifier ${topic} pour de meilleurs résultats.`,
    (topic: string) => `La recette secrète pour perfectionner ${topic}.`,
    (topic: string) => `Le processus éprouvé pour maîtriser ${topic}.`,
    (topic: string) => `Comment maximiser vos résultats avec ${topic}.`,
    (topic: string) => `La technique avancée pour révolutionner ${topic}.`,
    (topic: string) => `Le guide complet pour optimiser ${topic}.`,
  ],
  
  storytelling: [
    (topic: string) => `POV : tu découvres que ${topic} peut changer ta vie.`,
    (topic: string) => `Il était une fois ${topic}... et tout a basculé.`,
    (topic: string) => `L'histoire incroyable de comment j'ai maîtrisé ${topic}.`,
    (topic: string) => `Imaginez : ${topic} mais en version ultime.`,
    (topic: string) => `Ce jour où ${topic} a tout changé pour moi.`,
    (topic: string) => `Le voyage qui m'a fait découvrir la vraie puissance de ${topic}.`,
    (topic: string) => `Comment ${topic} m'a sauvé alors que tout semblait perdu.`,
    (topic: string) => `La révélation qui a transformé ma vision de ${topic}.`,
    (topic: string) => `Quand ${topic} est devenu mon super-pouvoir.`,
    (topic: string) => `L'aventure folle qui m'a appris tout sur ${topic}.`,
    (topic: string) => `Comment j'ai transformé ${topic} en arme secrète.`,
    (topic: string) => `Le moment où ${topic} a tout changé.`,
    (topic: string) => `Mon combat pour dompter ${topic}.`,
    (topic: string) => `L'épopée de comment j'ai cracké ${topic}.`,
    (topic: string) => `La quête pour comprendre ${topic}.`,
    (topic: string) => `Comment ${topic} m'a rendu invincible.`,
    (topic: string) => `L'histoire vraie derrière ${topic}.`,
    (topic: string) => `Mon parcours pour conquérir ${topic}.`,
    (topic: string) => `La transformation radicale grâce à ${topic}.`,
    (topic: string) => `Comment ${topic} a révolutionné ma vie.`,
    (topic: string) => `Le déclic qui a tout changé avec ${topic}.`,
    (topic: string) => `L'expérience qui m'a ouvert les yeux sur ${topic}.`,
    (topic: string) => `Comment j'ai surmonté ${topic} contre toute attente.`,
    (topic: string) => `La leçon de vie que ${topic} m'a apprise.`,
    (topic: string) => `Le cheminement pour apprivoiser ${topic}.`,
  ],
  
  shock: [
    (topic: string) => `${topic} est une arnaque, et voici pourquoi.`,
    (topic: string) => `Ce qu'on vous cache sur ${topic} va vous choquer.`,
    (topic: string) => `Pourquoi tout ce que vous savez sur ${topic} est faux.`,
    (topic: string) => `${topic} ne marche pas comme vous le pensez (preuve à l'appui).`,
    (topic: string) => `La vérité dérangeante sur ${topic} que personne n'accepte.`,
    (topic: string) => `Comment ${topic} vous manipule sans que vous vous en rendiez compte.`,
    (topic: string) => `Le scandale caché derrière ${topic} enfin exposé.`,
    (topic: string) => `Pourquoi ${topic} est surcoté et ne mérite pas votre attention.`,
    (topic: string) => `L'arnaque monumentale de ${topic} que tout le monde accepte.`,
    (topic: string) => `Ce que ${topic} ne veut pas que vous découvriez.`,
    (topic: string) => `Pourquoi ${topic} est un mensonge collectif.`,
    (topic: string) => `La sombre réalité derrière ${topic}.`,
    (topic: string) => `Comment ${topic} vous ment depuis le début.`,
    (topic: string) => `L'illusion collective de ${topic} démasquée.`,
    (topic: string) => `Pourquoi ${topic} est dangereux (la preuve).`,
    (topic: string) => `Le côté obscur de ${topic} qu'on vous cache.`,
    (topic: string) => `Comment ${topic} vous empêche de progresser.`,
    (topic: string) => `La supercherie de ${topic} révélée au grand jour.`,
    (topic: string) => `Pourquoi ${topic} est le pire conseil qu'on puisse vous donner.`,
    (topic: string) => `L'erreur massive que tout le monde fait avec ${topic}.`,
    (topic: string) => `Comment ${topic} vous maintient dans l'échec.`,
    (topic: string) => `Le mythe toxique de ${topic} qu'il faut déconstruire.`,
    (topic: string) => `Pourquoi ${topic} est obsolète et inutile.`,
    (topic: string) => `La vérité crue sur ${topic} sans fard.`,
    (topic: string) => `Comment ${topic} vous vole votre temps et votre énergie.`,
  ],
};

// Fonctions utilitaires
const getRandomElement = <T,>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

const getRandomElements = <T,>(array: T[], count: number): T[] => {
  const shuffled = [...array].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

// Génère un hook unique avec des composants aléatoires
const generateRandomHook = (topic: string, categoryId?: string): string => {
  // 70% du temps : utilise les templates spécifiques à la catégorie
  // 30% du temps : génère un hook complètement aléatoire
  const useCategoryTemplate = !categoryId || Math.random() < 0.7;
  
  if (categoryId && categoryId in categoryTemplates && useCategoryTemplate) {
    const templates = categoryTemplates[categoryId as keyof typeof categoryTemplates];
    const template = getRandomElement(templates);
    let hook = template(topic);
    
    // 50% du temps : ajoute un préfixe
    if (Math.random() < 0.5) {
      const prefix = getRandomElement(linguisticComponents.prefixes);
      hook = `${prefix} ${hook.toLowerCase()}`;
    }
    
    // 40% du temps : ajoute un suffixe
    if (Math.random() < 0.4) {
      const suffix = getRandomElement(linguisticComponents.suffixes);
      hook = `${hook} ${suffix}`;
    }
    
    return hook;
  }
  
  // Génération aléatoire complète
  const structure = getRandomElement(linguisticComponents.structures);
  let hook = structure(topic);
  
  // Ajoute des variations aléatoires
  const variations = [
    () => ` ${getRandomElement(linguisticComponents.intensifiers)}!`,
    () => ` ${getRandomElement(linguisticComponents.emotionalTriggers)}.`,
    () => ` ${getRandomElement(linguisticComponents.timeAdverbs)}!`,
    () => ` ${getRandomElement(linguisticComponents.resultPromises)}.`,
    () => ` ${getRandomElement(linguisticComponents.socialContexts)}.`,
  ];
  
  // Ajoute 1-3 variations
  const numVariations = Math.floor(Math.random() * 3) + 1;
  const selectedVariations = getRandomElements(variations, numVariations);
  
  selectedVariations.forEach(variation => {
    hook = hook.replace(/[.!?]$/, '') + variation();
  });
  
  // 30% du temps : ajoute un préfixe
  if (Math.random() < 0.3) {
    const prefix = getRandomElement(linguisticComponents.prefixes);
    hook = `${prefix} ${hook.toLowerCase()}`;
  }
  
  return hook;
};

// Explications par catégorie
const getExplanationForCategory = (categoryId: string): string => {
  const explanations: Record<string, string> = {
    curiosity: "Crée un mystère immédiat et donne envie d'en savoir plus",
    negative: "Le cerveau réagit 3x plus vite aux menaces qu'aux opportunités",
    value: "Promet un résultat concret et atteignable rapidement",
    storytelling: "Immersion immédiate grâce à une histoire personnelle",
    shock: "Provoque une réaction émotionnelle forte qui retient l'attention",
  };
  return explanations[categoryId] || "Accroche efficace pour retenir l'attention";
};

// Calcule l'intensité basée sur le contenu du hook
const calculateIntensity = (hook: string): number => {
  let intensity = 1;
  const intensifiers = linguisticComponents.intensifiers;
  const emotionalTriggers = linguisticComponents.emotionalTriggers;
  
  // Vérifie la présence de mots intensificateurs
  intensifiers.forEach(word => {
    if (hook.toLowerCase().includes(word.toLowerCase())) {
      intensity += 0.5;
    }
  });
  
  // Vérifie la présence de déclencheurs émotionnels
  emotionalTriggers.forEach(phrase => {
    if (hook.toLowerCase().includes(phrase.toLowerCase())) {
      intensity += 0.7;
    }
  });
  
  // Vérifie la ponctuation forte
  if (hook.includes('!') || hook.includes('?')) intensity += 0.3;
  if ((hook.match(/!/g) || []).length > 1) intensity += 0.5;
  
  // Limite à 5
  return Math.min(Math.max(Math.round(intensity), 1), 5);
};

// Génère un hook complet avec toutes ses métadonnées
export const generateHook = (
  topic: string, 
  categoryId?: string
): GeneratedHook => {
  const selectedCategory = categoryId || getRandomElement(hookCategories).id;
  const category = hookCategories.find(c => c.id === selectedCategory)!;
  
  const hook = generateRandomHook(topic, selectedCategory);
  const intensity = calculateIntensity(hook);
  
  return {
    id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    hook,
    category: category.name,
    categoryEmoji: category.emoji,
    explanation: getExplanationForCategory(selectedCategory),
    intensity,
  };
};

// Génère plusieurs hooks
export const generateHooks = (
  topic: string, 
  count: number = 5,
  categoryId?: string
): GeneratedHook[] => {
  const hooks: GeneratedHook[] = [];
  const usedHooks = new Set<string>();
  
  while (hooks.length < count) {
    const hook = generateHook(topic, categoryId);
    if (!usedHooks.has(hook.hook)) {
      usedHooks.add(hook.hook);
      hooks.push(hook);
    }
    
    // Évite les boucles infinies
    if (usedHooks.size > count * 3) break;
  }
  
  return hooks;
};

// Exporte le nombre total de combinaisons possibles
// Calcul approximatif : 50 structures × 20 modificateurs × 20 variations ≈ 20,000 combinaisons
export const TOTAL_POSSIBLE_COMBINATIONS = 20000;