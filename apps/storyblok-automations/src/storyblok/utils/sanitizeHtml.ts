export const removeLinksWithinParentheses = (text: string): string => {
  // Questa regex ora include uno spazio prima della parentesi aperta e cerca coppie di parentesi che contengono 'http://' o 'https://'
  const regex = / \([^\)]*https?:\/\/[^\)]*\)/g;
  return text.replace(regex, '');
};
