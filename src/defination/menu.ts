enum Menu {
	Albums,
	FM,
	Top,
	Search
}

const MenuMap = new Map([
	[Menu.Albums, 'ALBUM'],
	[Menu.FM, 'PERSONAL FM'],
	[Menu.Top, 'TOP'],
]);

const MenuPathMap = new Map([
  [Menu.Albums, '/'],
  [Menu.FM, '/personal'],
  [Menu.Top, '/topList'],
]);

export const menus = [
	Menu.Albums,
	Menu.FM,
	Menu.Top,
].map(menu => {
	return { key: menu, title: MenuMap.get(menu), path: MenuPathMap.get(menu) || '/'  }
})
