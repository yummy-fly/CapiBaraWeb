const IMG_BASE = 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt='
const img = (prompt: string, size: string) => IMG_BASE + encodeURIComponent(prompt) + '&image_size=' + size

export interface VillageSection {
  key: 'stays' | 'experiences' | 'chefs'
  eyebrow: string
  title: string
  desc: string
  image: string
  action: string
}

export interface VillageData {
  heroImage: string
  heroEyebrow: string
  heroTitle: string
  heroDesc: string
  storyEyebrow: string
  storyTitle: string
  storyBody: string
  keywords: { word: string; label: string }[]
  sections: VillageSection[]
  visitEyebrow: string
  visitTitle: string
  visitDesc: string
  address: string
  transport: string
}

export const villageData: VillageData = {
  heroImage: img('misty mountain village in Zhejiang China, terraced fields, white rural houses, winding country road, soft morning light, calm editorial landscape photography', 'portrait_4_3'),
  heroEyebrow: 'A LITTLE VILLAGE. A SLOWER LIFE.',
  heroTitle: '山野有趣，生活有味。',
  heroDesc: '来村里，住几日，做点事，吃顿好饭。',
  storyEyebrow: 'ABOUT THE VILLAGE',
  storyTitle: '一座村庄，\n一种生活。',
  storyBody: '我们把山野里的房子、手艺和餐桌，重新交还给日常。这里没有赶路的必要，只有一盏茶、一阵风，和愿意慢下来的人。',
  keywords: [
    { word: '住', label: '睡进山景' },
    { word: '做', label: '亲手体验' },
    { word: '尝', label: '围坐好餐桌' }
  ],
  sections: [
    { key: 'stays', eyebrow: 'STAY IN THE MOUNTAINS', title: '睡进一片山景', desc: '推开窗，山风和晨光一起进来。', action: '去住一晚', image: img('cozy mountain guesthouse bedroom in a Chinese village, wooden bed, linen bedding, large window overlooking green mountains, warm natural light, editorial interior photography', 'landscape_4_3') },
    { key: 'experiences', eyebrow: 'MAKE SOMETHING BY HAND', title: '亲手体验乡村', desc: '跟着村里的手艺人，做一件有温度的小事。', action: '去做点什么', image: img('hands making traditional rice cakes in a Chinese village courtyard, wooden tools, steam, joyful family craft experience, warm documentary photography', 'landscape_4_3') },
    { key: 'chefs', eyebrow: 'A TABLE FOR GOOD FOOD', title: '围坐一张好餐桌', desc: '山里的食材，交给懂它的人，做成一桌乡土风味。', action: '去吃一顿饭', image: img('farm to table private feast in a Chinese mountain village, long wooden table, seasonal dishes, local vegetables, warm evening light, refined food photography', 'landscape_4_3') }
  ],
  visitEyebrow: 'COME SAY HELLO',
  visitTitle: '来村里坐坐。',
  visitDesc: '不必带着计划来，山野自会安排好一天。',
  address: '浙江省丽水市 · 卡皮巴拉自治村',
  transport: '自驾导航至村口，或提前联系村里安排接驳。'
}
