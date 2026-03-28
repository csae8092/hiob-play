export const app_config = {
	title: 'The Book of Job in Early Medieval Jewish Literature',
	title_short: 'HIOB',
	code_repo_url: 'https://github.com/csae8092/hiob-play'
};

export const main_nav = [
	{
		label: 'About',
		href: '/about'
	},
	{
		label: 'Imprint',
		href: '/imprint'
	}
];

export const imprint_api_url = 'https://imprint.acdh.oeaw.ac.at/21966/?redmine=disabled';

export const data_repo_url = 'https://raw.githubusercontent.com/hiob-project/hiob-data/main/json_dumps/';

export const data_mapping = {
	verses: {
		label: "Verses",
		file: "verses.json"
	},
	passages: {
		label: "Passages",
		file: "passages.json"
	},
	midrash: {
		label: "Midrash",
		file: "midrash.json"
	},
}
