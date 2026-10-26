/**
 * 线性图标库：SVG 字符串，{c} 为颜色占位符
 */
const wrap = (inner: string): string =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="{c}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`

export const ICONS: Record<string, string> = {
  // 卡皮巴拉 logo（简笔线条）
  logo: wrap(
    '<path d="M5.5 11a6.5 6 0 0 1 13 0v4.5A3.5 3.5 0 0 1 15 19H9a3.5 3.5 0 0 1-3.5-3.5V11z"/>' +
    '<path d="M8.7 5.6 8.2 3.4l2.4 1.3"/>' +
    '<circle cx="10.2" cy="11" r="0.9" fill="{c}" stroke="none"/>' +
    '<path d="M5.5 12.6H4.2a1.2 1.2 0 0 0 0 2.4h1.3"/>'
  ),
  bell: wrap(
    '<path d="M18 16v-5a6 6 0 1 0-12 0v5l-1.5 2.5h15L18 16z"/>' +
    '<path d="M10.5 21a1.9 1.9 0 0 0 3 0"/>'
  ),
  menu: wrap('<path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/>'),
  pin: wrap(
    '<path d="M12 21s-7-5.6-7-11a7 7 0 1 1 14 0c0 5.4-7 11-7 11z"/>' +
    '<circle cx="12" cy="10" r="2.5"/>'
  ),
  chevleft: wrap('<path d="M14.5 5.5 8 12l6.5 6.5"/>'),
  chevright: wrap('<path d="M9.5 5.5 16 12l-6.5 6.5"/>'),
  chevdown: wrap('<path d="M6 9.5l6 6 6-6"/>'),
  arrowright: wrap('<path d="M4 12h15"/><path d="M13 6l6 6-6 6"/>'),
  arrowupright: wrap('<path d="M7 17 17 7"/><path d="M8.5 7H17v8.5"/>'),
  calendar: wrap(
    '<rect x="3.5" y="5" width="17" height="15.5" rx="2"/>' +
    '<path d="M3.5 9.5h17"/><path d="M8 3v4"/><path d="M16 3v4"/>'
  ),
  megaphone: wrap(
    '<path d="M3 10.5v3l14 5v-13l-14 5z"/>' +
    '<path d="M7.5 15.5V19"/>'
  ),
  home: wrap(
    '<path d="M4 11l8-7 8 7"/>' +
    '<path d="M6 9.5V20h12V9.5"/>' +
    '<path d="M10 20v-5.5h4V20"/>'
  ),
  sprout: wrap(
    '<path d="M12 21v-7"/>' +
    '<path d="M12 14c0-4.2-3.1-6.3-7.2-6.3 0 4.2 3.1 6.3 7.2 6.3z"/>' +
    '<path d="M12 11.2c0-3.6 2.6-5.4 6.2-5.4 0 3.6-2.6 5.4-6.2 5.4z"/>'
  ),
  bed: wrap(
    '<path d="M3 6.5v11.5"/>' +
    '<path d="M3 14h18v4"/>' +
    '<path d="M21 18v-4.5a3 3 0 0 0-3-3H3"/>' +
    '<path d="M6.5 12.5h4"/>'
  ),
  user: wrap(
    '<circle cx="12" cy="8" r="3.5"/>' +
    '<path d="M5 20c0-3.7 3-6.4 7-6.4s7 2.7 7 6.4"/>'
  ),
  chef: wrap(
    '<path d="M6.8 10.6a3.6 3.6 0 0 1 1.9-6.7 5.2 5.2 0 0 1 6.6 0 3.6 3.6 0 0 1 1.9 6.7V18H6.8v-7.4z"/>' +
    '<path d="M6.8 14.2h10.4"/>' +
    '<path d="M9 21h6"/>'
  ),
  users: wrap(
    '<circle cx="9" cy="9" r="3"/>' +
    '<path d="M3.5 19c0-3 2.4-5.1 5.5-5.1s5.5 2.1 5.5 5.1"/>' +
    '<circle cx="16.8" cy="9.6" r="2.4"/>' +
    '<path d="M16.4 14.3c2.6.4 4.1 2.2 4.1 4.7"/>'
  ),
  heart: wrap(
    '<path d="M12 20s-7.4-4.7-9.2-8.9A5 5 0 0 1 12 6.5a5 5 0 0 1 9.2 4.6C19.4 15.3 12 20 12 20z"/>'
  ),
  'heart-filled': wrap(
    '<path d="M12 20s-7.4-4.7-9.2-8.9A5 5 0 0 1 12 6.5a5 5 0 0 1 9.2 4.6C19.4 15.3 12 20 12 20z" fill="{c}" stroke="none"/>'
  ),
  mountain: wrap(
    '<path d="M3 18 9.5 8l4 6 2.5-3.5L21 18H3z"/>'
  ),
  car: wrap(
    '<path d="M5 17h14l-1-6H6l-1 6z"/><path d="M7 11l1.5-3h7l1.5 3"/><circle cx="8" cy="17" r="1.5"/><circle cx="16" cy="17" r="1.5"/>'
  ),
  utensils: wrap(
    '<path d="M7 3v8"/><path d="M4.5 3v5a2.5 2.5 0 0 0 5 0V3"/><path d="M7 10v11"/><path d="M16 3v18"/><path d="M16 3c3 2 3 5 0 7"/>'
  ),
  leaf: wrap(
    '<path d="M20 5c-9 0-14 5-14 13 8 0 13-5 14-13z"/>' +
    '<path d="M6 18c3-5 7-9 11-11"/>'
  ),
  clock: wrap(
    '<circle cx="12" cy="12" r="8.5"/>' +
    '<path d="M12 7.5V12l3 2"/>'
  ),
  share: wrap(
    '<circle cx="6" cy="12" r="2.5"/>' +
    '<circle cx="17" cy="6.5" r="2.5"/>' +
    '<circle cx="17" cy="17.5" r="2.5"/>' +
    '<path d="M8.3 10.8l6.4-3.3"/>' +
    '<path d="M8.3 13.2l6.4 3.3"/>'
  ),
  check: wrap('<path d="M5 12.5l4.5 4.5L19 7.5"/>'),
  logout: wrap(
    '<path d="M9 4H5.5A1.5 1.5 0 0 0 4 5.5v13A1.5 1.5 0 0 0 5.5 20H9"/>' +
    '<path d="M15 8l4 4-4 4"/>' +
    '<path d="M19 12H9"/>'
  ),
  headset: wrap(
    '<path d="M4 13a8 8 0 0 1 16 0"/>' +
    '<rect x="3" y="13" width="4" height="6" rx="1.5"/>' +
    '<rect x="17" y="13" width="4" height="6" rx="1.5"/>' +
    '<path d="M20 19v1a2 2 0 0 1-2 2h-4"/>'
  ),
  shield: wrap(
    '<path d="M12 3.5 19 6v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-2.5z"/>' +
    '<path d="M9 12l2 2 4-4"/>'
  ),
  close: wrap('<path d="M6 6l12 12"/><path d="M18 6 6 18"/>')
}
