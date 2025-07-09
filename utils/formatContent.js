export function formatContent(content, translate, localPath) {
  // Verifica si content es un objeto con una propiedad 'text' o si es un string directamente
  let textKey;
  if (typeof content === 'object' && content !== null) {
    textKey = content.text || ''; // Toma el texto del objeto si existe
  } else if (typeof content === 'string') {
    textKey = content; // Si es un string, úsalo directamente
  } else {
    return ''; // Si no es válido, devuelve una cadena vacía
  }

  if (textKey.trim() === '') {
    return '';
  }

  // Traducción
  let translatedText;
  try {
    translatedText = translate(textKey, {
      email: '<a href="mailto:support@tvmarkets.com">support@tvmarkets.com</a>',
      emaillatam: '<a href="mailto:operation@tvmarkets.com.">operation@tvmarkets.com.</a>',
      emailzh: '<a href="mailto:cnsupport@tvmarkets.com">cnsupport@tvmarkets.com</a>',
      emailko: '<a href="mailto:korean@tvmarkets.com">korean@tvmarkets.com</a>',
      recruiting: '<a href="mailto:recruiting@tvmarkets.com">recruiting@tvmarkets.com</a>',
      ecarvalho: '<a href="mailto:ecarvalho@tvmarkets.com">ecarvalho@tvmarkets.com</a>',
      emailvulkan: '<a href="mailto: info@vulkanbrokersolutions.com"> info@vulkanbrokersolutions.com</a>',
    });
  } catch (error) {
    return '';
  }

  // Reemplazos de formato
  return translatedText
    .replace(/\[br\]/g, '<br>')
    .replace(/\[strong\](.*?)\[\/strong\]/g, '<strong>$1</strong>')
    .replace(/\[link url="(.*?)"\](.*?)\[\/link\]/g, '<a href="$1" target="_blank" rel="noopener noreferrer">$2</a>')
    .replace(/\[nuxtlink url="(.*?)"\](.*?)\[\/nuxtlink\]/g, (match, url, text) => {
      const localLink = localPath(url);
      return `<a href="${localLink}">${text}</a>`;
    });
}