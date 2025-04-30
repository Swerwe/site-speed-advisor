import { TBTRecommendations } from "../types";

export const analyzeTBT = (tbt: {
    value: number;
    longTasks: { duration: number, startTime: number, name: string }[];
    scripts: { withDefer: number, withAsync: number, total: number };
    mainThreadBlocks: number;
}): TBTRecommendations => {
    const tbtRecommendations: TBTRecommendations = {
        mainMessage: null,
        recommendations: []
    }

    // Базовое предупреждение о высоком TBT
    if (tbt.value > 300) {
        tbtRecommendations.mainMessage = `Слишком высокий Total Blocking Time (${tbt.value}мс). Оптимизируйте работу основного потока.`;
    }

    // Анализ longTasks
    const jsRelatedTasks = tbt.longTasks.filter(task => 
        task.name.includes('JS') || 
        task.name.includes('Function Call') || 
        task.name.includes('Event')
    );
    const cssRelatedTasks = tbt.longTasks.filter(task => 
        task.name.includes('Layout') || 
        task.name.includes('Style Recalc') ||
        task.name.includes('Paint')
    );

    // Рекомендации для JavaScript
    if (jsRelatedTasks.length > 0) {
        tbtRecommendations.recommendations.push(
            "Разбейте код на асинхронные чанки (используйте import(), requestIdleCallback)",
            "Вынесите тяжелые вычисления в Web Workers",
            "Оптимизируйте циклы рендеринга (virtualized lists для больших данных)"
        );
    }

    // Рекомендации для CSS/рендеринга
    if (cssRelatedTasks.length > 0) {
        tbtRecommendations.recommendations.push(
            "Упростите CSS-селекторы (избегайте :nth-child, сложных комбинаций)",
            "Используйте will-change для анимируемых элементов"
        );
    }

    // Анализ скриптов
    const syncScriptsRatio = (tbt.scripts.total - tbt.scripts.withDefer - tbt.scripts.withAsync) / tbt.scripts.total;
    if (syncScriptsRatio > 0.3) {
        tbtRecommendations.recommendations.push(
            "Замените синхронные скрипты на defer/async (сейчас " +
            `${Math.round(syncScriptsRatio * 100)}% синхронных скриптов)`
        );
    }

    // Общие рекомендации
    if (tbt.mainThreadBlocks > 10) {
        tbtRecommendations.recommendations.push(
            "Слишком много блокировок основного потока (" +
            `${tbt.mainThreadBlocks}). Оптимизируйте или отложите не критичные задачи.`
        );
    }

    // Экстренные меры
    if (tbt.value > 500) {
        tbtRecommendations.recommendations.push(
            "Экстренные меры:",
            "- Отложите не критичный JS с defer",
            "- Удалите неиспользуемый код (webpack-bundle-analyzer)",
            "- Примените throttle/debounce для обработчиков событий"
        );
    }

    return tbtRecommendations;
};
