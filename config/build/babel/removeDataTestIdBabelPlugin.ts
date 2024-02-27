import { PluginItem } from "@babel/core";

/** Кастомный плагин для удаления data-атрибутов для покрытия e2e тестами из бандла (см. файл App)*/
export function removeDataTestIdBabelPlugin(): PluginItem {
  return {
    visitor: {
      Program(path, state) {
        /** достаем из стэйта опции для передачи в плагин. Это и есть запрещенные пропсы, кторые будут удаляться 
         * 
         * в переменную из пропсов попадет data-testId это data-атрибут для покрытия тестами. КОТОРЫЙ НАДО УДАЛЯТЬ ИЗ БАНДЛА
        */
        const forbiddenProps = state.opts.props || [];

        /** благодяря ф-ии travers ищем нужнуюю ноду и как-то ее обрабатываем
         *  JSXIdentifier это и есть идентификатор DataTestId который нам нужен
         * */
        path.traverse({
          JSXIdentifier(current) {
            const nodeName = current.node.name;

            /** смотрим есть ли nodeName в запрещенных пропсах, т.е атрибут data-testId для покрытия тестами */
            if (forbiddenProps.includes(nodeName)) {
              /** если есть то удаляем ноду (выпиливаем атрибут) */
              current.parentPath.remove();
            }
          },
        });
      },
    },
  };
}
