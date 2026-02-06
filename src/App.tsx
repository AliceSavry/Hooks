import { useState, useCallback, useMemo } from 'react';
import { 
  hookCategories, 
  generateViralHooks,
  generateViralHook,
  getGlobalStats,
  viralHooksDatabase,
  type ViralHook
} from './hooks/viralHooksDatabase';

// Interface pour l'affichage
interface DisplayHook extends ViralHook {
  id: string;
}

export function App() {
  const [topic, setTopic] = useState('');
  const [generatedHooks, setGeneratedHooks] = useState<DisplayHook[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showTips, setShowTips] = useState(false);
  const [hookCount, setHookCount] = useState(5);
  const [tierFilter, setTierFilter] = useState<'all' | 'platine'>('all');

  // Récupère les statistiques globales
  const globalStats = useMemo(() => getGlobalStats(), []);

  // Exemples de sujets populaires
  const popularTopics = [
    "ranger sa chambre",
    "un skin Fortnite",
    "faire du slime",
    "les réseaux sociaux",
    "réviser un examen",
    "un tuto maquillage",
    "un cheat code",
    "une recette facile",
    "un workout rapide",
    "une astuce téléphone"
  ];

  // Génère des hooks
  const handleGenerate = useCallback(() => {
    if (!topic.trim()) return;
    
    const tierPriority = tierFilter === 'platine' ? 'platine' : 'mixed';
    const hooks = generateViralHooks(topic, hookCount, selectedCategoryId || undefined, tierPriority);
    
    setGeneratedHooks(hooks.map(h => ({ ...h, id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}` })));
  }, [topic, hookCount, selectedCategoryId, tierFilter]);

  // Génère des hooks premium (uniquement Platine)
  const handleGeneratePremium = useCallback(() => {
    if (!topic.trim()) return;
    
    const hooks = generateViralHooks(topic, hookCount, selectedCategoryId || undefined, 'platine');
    
    setGeneratedHooks(hooks.map(h => ({ ...h, id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}` })));
  }, [topic, hookCount, selectedCategoryId]);

  // Copie dans le presse-papier
  const copyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Régénère un hook individuel
  const regenerateSingle = (hookId: string) => {
    const hookToRegenerate = generatedHooks.find(h => h.id === hookId);
    if (!hookToRegenerate || !topic.trim()) return;
    
    const tierPriority = tierFilter === 'platine' ? 'platine' : 'mixed';
    const newHook = generateViralHook(topic, hookToRegenerate.categoryId, tierPriority as 'platine' | 'or' | 'argent' | undefined);
    
    setGeneratedHooks(prev => 
      prev.map(h => h.id === hookId ? { ...newHook, id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}` } : h)
    );
  };

  // Exporte les hooks générés
  const exportHooks = () => {
    if (generatedHooks.length === 0) return;
    
    const timestamp = new Date().toISOString().split('T')[0];
    const topicSlug = topic.replace(/[^a-z0-9]/gi, '_').toLowerCase().substring(0, 30);
    const filename = `hooks_${topicSlug}_${timestamp}.txt`;
    
    const content = generatedHooks.map((hook, index) => {
      const tierBadge = hook.tier === 'platine' ? '💎 PLATINE' : hook.tier === 'or' ? '🥇 OR' : '🥈 ARGENT';
      return `HOOK ${index + 1} ${tierBadge}
"${hook.text}"
💡 ${hook.explanation}
📊 Score Viral: ${hook.viralScore}/100 | Engagement: ${hook.engagementRate}% | Partage: ${hook.shareRate}%
────────────────────`;
    }).join('\n\n');
    
    const header = `🚀 HOOKS VIRAL GÉNÉRÉS POUR: "${topic}"
Date: ${new Date().toLocaleDateString('fr-FR')}
Total: ${generatedHooks.length} hooks | Score moyen: ${Math.round(generatedHooks.reduce((a: number, h: ViralHook) => a + h.viralScore, 0) / generatedHooks.length)}
${generatedHooks.filter(h => h.tier === 'platine').length} Platinium | ${generatedHooks.filter(h => h.tier === 'or').length} Or | ${generatedHooks.filter(h => h.tier === 'argent').length} Argent
═══════════════════════════════════════

`;
    
    const blob = new Blob([header + content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Sélectionne un sujet populaire
  const selectPopularTopic = (popularTopic: string) => {
    setTopic(popularTopic);
  };

  // Récupère la couleur de la catégorie
  const getCategoryColor = (categoryId: string) => {
    const cat = hookCategories.find(c => c.id === categoryId);
    return cat?.color || 'from-gray-500 to-gray-600';
  };

  // Récupère l'emoji de la catégorie
  const getCategoryEmoji = (categoryId: string) => {
    const cat = hookCategories.find(c => c.id === categoryId);
    return cat?.emoji || '📌';
  };

  // Récupère le nom de la catégorie
  const getCategoryName = (categoryId: string) => {
    const cat = hookCategories.find(c => c.id === categoryId);
    return cat?.name || 'Inconnu';
  };

  // Affiche la barre de score viral
  const ViralScoreBar = ({ score }: { score: number }) => {
    const getColor = () => {
      if (score >= 90) return 'from-yellow-400 to-yellow-600';
      if (score >= 75) return 'from-orange-400 to-orange-600';
      return 'from-gray-400 to-gray-600';
    };
    
    const getLabel = () => {
      if (score >= 90) return 'PLATINE';
      if (score >= 75) return 'OR';
      return 'ARGENT';
    };
    
    return (
      <div className="flex items-center gap-2">
        <div className="w-20 h-2 bg-gray-700 rounded-full overflow-hidden">
          <div 
            className={`h-full bg-gradient-to-r ${getColor()} transition-all duration-500`}
            style={{ width: `${score}%` }}
          />
        </div>
        <span className={`text-xs font-bold bg-gradient-to-r ${getColor()} bg-clip-text text-transparent`}>
          {getLabel()} {score}
        </span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900">
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-indigo-500/10 blur-3xl"></div>
        <div className="relative max-w-6xl mx-auto px-4 py-8 sm:py-12">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm text-purple-200">
              <span className="animate-pulse">🔥</span>
              <span>{globalStats.totalHooks} hooks viraux vérifiés - Phrases complètes en français</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400">
              Hook Generator Pro
            </h1>
            <p className="text-lg text-purple-200/80 max-w-2xl mx-auto">
              Générateur d'accroches virales basées sur des <span className="text-pink-400 font-semibold">statistiques réelles</span> de performance.
              <span className="block text-yellow-400 font-bold mt-1">Hooks notés par score viral (90+ = Platinium)</span>
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 pb-16">
        {/* Stats Bar */}
        <div className="mb-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 backdrop-blur-sm border border-yellow-500/30 rounded-2xl p-4 text-center">
            <div className="text-2xl font-bold text-yellow-400">{globalStats.byTier.platine}</div>
            <div className="text-sm text-yellow-200/70">💎 Platinium</div>
          </div>
          <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/10 backdrop-blur-sm border border-orange-500/30 rounded-2xl p-4 text-center">
            <div className="text-2xl font-bold text-orange-400">{globalStats.byTier.or}</div>
            <div className="text-sm text-orange-200/70">🥇 Or</div>
          </div>
          <div className="bg-gradient-to-br from-gray-500/20 to-gray-600/10 backdrop-blur-sm border border-gray-500/30 rounded-2xl p-4 text-center">
            <div className="text-2xl font-bold text-gray-400">{globalStats.byTier.argent}</div>
            <div className="text-sm text-gray-200/70">🥈 Argent</div>
          </div>
          <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-4 text-center">
            <div className="text-2xl font-bold text-purple-400">{globalStats.avgViralScore}</div>
            <div className="text-sm text-purple-200/70">📊 Score Moyen</div>
          </div>
        </div>

        {/* Tips Toggle */}
        <div className="mb-8">
          <button
            onClick={() => setShowTips(!showTips)}
            className="flex items-center gap-2 text-purple-300 hover:text-white transition-colors"
          >
            <span className="text-xl">💡</span>
            <span className="font-medium">La méthode du "Triple Hook" pour maximiser la rétention</span>
            <svg 
              className={`w-4 h-4 transition-transform ${showTips ? 'rotate-180' : ''}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {showTips && (
            <div className="mt-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 space-y-4">
              <h3 className="text-xl font-bold text-white">🎯 La Méthode du "Triple Hook"</h3>
              <p className="text-purple-200/80">Pour qu'une accroche dépasse le million, elle doit saturer les sens :</p>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-pink-500/20 to-pink-600/10 rounded-xl p-4 border border-pink-500/20">
                  <div className="text-2xl mb-2">👁️</div>
                  <h4 className="font-bold text-white">Hook Visuel</h4>
                  <p className="text-sm text-purple-200/70">Quelque chose bouge ou change immédiatement (objet jeté, changement de décor)</p>
                </div>
                <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 rounded-xl p-4 border border-purple-500/20">
                  <div className="text-2xl mb-2">📝</div>
                  <h4 className="font-bold text-white">Hook Textuel</h4>
                  <p className="text-sm text-purple-200/70">Phrase en GROS au centre résumant la promesse ou créant un mystère</p>
                </div>
                <div className="bg-gradient-to-br from-indigo-500/20 to-indigo-600/10 rounded-xl p-4 border border-indigo-500/20">
                  <div className="text-2xl mb-2">🗣️</div>
                  <h4 className="font-bold text-white">Hook Oral</h4>
                  <p className="text-sm text-purple-200/70">Dynamique, sans "Bonjour", allant directement au choc ou à l'info</p>
                </div>
              </div>
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                <p className="text-red-300 font-medium">
                  ⚠️ Règle d'or : Ne jamais dire "Dans cette vidéo, je vais vous montrer...". Va directement au choc !
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Input Section */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 sm:p-8 mb-8">
          <div className="space-y-6">
            {/* Sujets populaires */}
            <div>
              <label className="block text-sm font-medium text-purple-200 mb-2">
                🚀 Sujets populaires
              </label>
              <div className="flex flex-wrap gap-2">
                {popularTopics.map((popularTopic) => (
                  <button
                    key={popularTopic}
                    onClick={() => selectPopularTopic(popularTopic)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                      topic === popularTopic
                        ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    {popularTopic}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-purple-200 mb-2">
                📹 Quel est le thème de ta vidéo ?
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                placeholder="Ex: ranger sa chambre, un skin Fortnite, faire du slime..."
                className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-lg"
              />
            </div>

            {/* Tier Filter */}
            <div>
              <label className="block text-sm font-medium text-purple-200 mb-2">
                🎯 Qualité des hooks
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setTierFilter('all')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    tierFilter === 'all'
                      ? 'bg-white text-purple-900'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  ✨ Tous les hooks
                </button>
                <button
                  onClick={() => setTierFilter('platine')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    tierFilter === 'platine'
                      ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  💎 Premium (90+)
                </button>
              </div>
            </div>

            {/* Nombre de hooks à générer */}
            <div>
              <label className="block text-sm font-medium text-purple-200 mb-2">
                🔢 Combien de hooks générer ?
              </label>
              <div className="flex flex-wrap gap-2">
                {[5, 10, 15, 20].map((count) => (
                  <button
                    key={count}
                    onClick={() => setHookCount(count)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      hookCount === count
                        ? 'bg-white text-purple-900'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    {count} hooks
                  </button>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-purple-200 mb-3">
                🏷️ Filtrer par type de hook (optionnel)
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategoryId(null)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategoryId === null
                      ? 'bg-white text-purple-900'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  Toutes les catégories
                </button>
                {hookCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategoryId(cat.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedCategoryId === cat.id
                        ? `bg-gradient-to-r ${cat.color} text-white shadow-lg`
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    {cat.emoji} {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Buttons */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleGenerate}
                disabled={!topic.trim()}
                className="flex-1 sm:flex-none px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all transform hover:scale-105 active:scale-95"
              >
                ✨ Générer {hookCount} Hooks
              </button>
              <button
                onClick={handleGeneratePremium}
                disabled={!topic.trim()}
                className="px-6 py-4 bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-medium rounded-xl shadow-lg shadow-yellow-500/25 transition-all"
              >
                💎 Hooks Premium
              </button>
            </div>
          </div>
        </div>

        {/* Generated Hooks */}
        {generatedHooks.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">
                🎣 Tes Hooks ({generatedHooks.length})
              </h2>
              <div className="flex items-center gap-3">
                <button
                  onClick={exportHooks}
                  disabled={generatedHooks.length === 0}
                  className="text-green-300 hover:text-green-400 transition-colors flex items-center gap-2 disabled:text-gray-500 disabled:cursor-not-allowed"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Exporter
                </button>
                <button
                  onClick={handleGenerate}
                  className="text-purple-300 hover:text-white transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Régénérer
                </button>
              </div>
            </div>

            <div className="grid gap-4">
              {generatedHooks.map((hook) => (
                <div
                  key={hook.id}
                  className={`group bg-white/5 hover:bg-white/10 backdrop-blur-sm border rounded-2xl p-5 transition-all ${
                    hook.tier === 'platine' 
                      ? 'border-yellow-500/30 shadow-lg shadow-yellow-500/10' 
                      : hook.tier === 'or'
                      ? 'border-orange-500/30'
                      : 'border-white/10'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getCategoryColor(hook.categoryId)} text-white`}>
                          {getCategoryEmoji(hook.categoryId)} {getCategoryName(hook.categoryId)}
                        </span>
                        <ViralScoreBar score={hook.viralScore} />
                      </div>
                      <p className="text-lg sm:text-xl text-white font-medium leading-relaxed">
                        "{hook.text}"
                      </p>
                      <p className="text-sm text-purple-300/60">
                        💡 {hook.explanation}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-purple-300/50">
                        <span>📊 {hook.engagementRate}% engagement</span>
                        <span>🔄 {hook.shareRate}% partage</span>
                        <span>⏱️ {hook.avgWatchTime}s visionnage</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => copyToClipboard(hook.text, hook.id)}
                        className={`p-3 rounded-xl transition-all ${
                          copiedId === hook.id
                            ? 'bg-green-500 text-white'
                            : 'bg-white/10 text-white hover:bg-white/20'
                        }`}
                        title="Copier"
                      >
                        {copiedId === hook.id ? (
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                          </svg>
                        )}
                      </button>
                      <button
                        onClick={() => regenerateSingle(hook.id)}
                        className="p-3 bg-white/10 text-white hover:bg-white/20 rounded-xl transition-all"
                        title="Autre variante"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {generatedHooks.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🎬</div>
            <h3 className="text-xl font-bold text-white mb-2">Prêt à créer des hooks viraux ?</h3>
            <p className="text-purple-300/70 mb-6">Entre ton thème de vidéo et génère des phrases complètes notées par performance</p>
            
            <div className="grid sm:grid-cols-2 gap-4 max-w-lg mx-auto">
              {popularTopics.slice(0, 4).map((topicExample) => (
                <button
                  key={topicExample}
                  onClick={() => selectPopularTopic(topicExample)}
                  className="px-4 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white transition-all"
                >
                  {topicExample}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Category Descriptions */}
        <div className="mt-12 space-y-4">
          <h3 className="text-xl font-bold text-white">📚 Comprendre les 5 types de hooks et leurs performances</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {hookCategories.map((cat) => {
              const catHooks = viralHooksDatabase.filter(h => h.categoryId === cat.id);
              const avgScore = Math.round(catHooks.reduce((a, h) => a + h.viralScore, 0) / catHooks.length);
              
              return (
                <div
                  key={cat.id}
                  className={`bg-gradient-to-br ${cat.color}/20 to-transparent border ${cat.color.replace('from-', '').split(' ')[0]}/20 rounded-xl p-4`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{cat.emoji}</span>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                      avgScore >= 90 ? 'bg-yellow-500/30 text-yellow-300' :
                      avgScore >= 75 ? 'bg-orange-500/30 text-orange-300' :
                      'bg-gray-500/30 text-gray-300'
                    }`}>
                      ⭐ {avgScore}
                    </span>
                  </div>
                  <h4 className="font-bold text-white mb-1">{cat.name}</h4>
                  <p className="text-sm text-purple-200/70 mb-2">{cat.description}</p>
                  <p className="text-xs text-purple-300/50">{catHooks.length} hooks • {cat.avgEngagement}% avg engagement</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pro Tips Section */}
        <div className="mt-12 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
            <span>⚡</span> Tips Pro pour tes vidéos Shorts/Reels
          </h3>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div className="flex items-start gap-3">
              <span className="text-green-400">✓</span>
              <p className="text-purple-200/80">Coupe tous les blancs au montage - pas une seule demi-seconde de silence !</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-400">✓</span>
              <p className="text-purple-200/80">Les 2 premières secondes = le moment où on décide de rester ou scroller</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-400">✓</span>
              <p className="text-purple-200/80">Ajoute un texte écrit en GROS au centre de l'écran</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-400">✓</span>
              <p className="text-purple-200/80">Commence avec du mouvement ou un changement visuel immédiat</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-400">✓</span>
              <p className="text-purple-200/80">Ne dis jamais "Bonjour" ou "Dans cette vidéo..." - va direct au fait !</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-400">✓</span>
              <p className="text-purple-200/80">Utilise la méthode du Triple Hook (Visuel + Textuel + Oral)</p>
            </div>
          </div>
        </div>

        {/* Tier Legend */}
        <div className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">📊 Légende des performances</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center text-xl">
                💎
              </div>
              <div>
                <p className="font-bold text-yellow-400">Platinium (90-100)</p>
                <p className="text-xs text-purple-300/60">Top 15% - Engagement 12-15%</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-xl">
                🥇
              </div>
              <div>
                <p className="font-bold text-orange-400">Or (75-89)</p>
                <p className="text-xs text-purple-300/60">Top 40% - Engagement 8-12%</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-500 to-gray-600 flex items-center justify-center text-xl">
                🥈
              </div>
              <div>
                <p className="font-bold text-gray-400">Argent (50-74)</p>
                <p className="text-xs text-purple-300/60">Base - Engagement 5-8%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-purple-400/50 text-sm">
          <p>Fait avec 💜 pour les créateurs de contenu</p>
          <p className="mt-1">{globalStats.totalHooks} hooks vérifiés - Phrases complètes en français</p>
          <p className="mt-1 text-xs">Scores basés sur des études Meta/TikTok 2023-2024</p>
        </footer>
      </main>
    </div>
  );
}
