// Shared reference type used across all three datasets
export interface Ref {
	id: number;
	value: string;
	order: string;
}

export interface TagRef {
	id: number;
	value: string;
	color: string;
}

// ----- verses.json -----
export interface Verse {
	id: number;
	order: string;
	verse: string;
	quote: string;
	mentions: Ref[];
	hiob_id: string;
}

export type VersesData = Record<string, Verse>;

// ----- midrash.json -----
export interface Midrash {
	id: number;
	order: string;
	name: string;
	info_about_text: string;
	mentions: Ref[];
}

export type MidrashData = Record<string, Midrash>;

// ----- passages.json -----
export interface Passage {
	id: number;
	order: string;
	mention: Omit<Ref, 'order'>[];
	hiob_id: string;
	midrash: Ref[];
	passages: string;
	verses: Ref[];
	quote: string;
	abstract: string;
	decontextualized_reception: TagRef[];
	narrative_reception: TagRef[];
	points_of_note: string;
	quotation_and_speakers: TagRef[];
	classic_parallels: string | null;
}

export type PassagesData = Record<string, Passage>;
