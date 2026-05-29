export const HISTORICAL_REDIRECTS: Record<string, string> = {
  // ASP.NET legacy URLs
  '/page.aspx': '/',
  '/pg.aspx': '/',
  '/page.aspx?dt=242': '/category/fundraising-events/',
  '/page.aspx?dt=754': '/',
  '/pg.aspx?id=67': '/category/environmental/',
  '/?page_id=419': '/fundraising/',

  // Old paths with live links
  '/children/': '/childrens-charities',
  '/non-profits/': '/non-profits/',

  // WordPress upload URLs that picked up inbound links
  '/wp-content/uploads/2018/09/https_2F2Fcdn.evbuc_.com2Fimages2F498396242F445691342332F12Foriginal.jpg':
    '/listing/red-dress-gala/',
  '/wp-content/uploads/2018/09/https_2F2Fcdn.evbuc_.com2Fimages2F493938202F2374769491622F12Foriginal.jpg':
    '/listing/sign-painting-fundraiser/',
  '/wp-content/uploads/2019/01/1240.jpg': '/',
  '/images/smaller_RMHC2212.gif':
    '/profile/ronald-mcdonald-house-charities-toronto/',

  // Specific historical event/charity URLs
  '/walk-now-for-autism-speaks-2014': '/listing/walk-now-for-autism-speaks/',
  '/merry-music-at-the-grove-2012': '/listing/merry-musique-at-the-grove/',
  '/st-michaels-hospital-foundation':
    '/profile/st-michaels-hospital-foundation/',
};
