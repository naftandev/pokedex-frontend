export interface IGetPokemonsResponse {
  data: IPokemonInfo[]
  length: number
  next: string
  prev: string
}

export interface IPokemonInfo {
  key?: number
  id?: number
  picture: string
  order: number
  height: number
  name: string
  moves: string[]
  stats: IStat[]
  abilities: string[]
}

interface IStat {
  name: string
  value: number
}

export interface IPokemonData {
  abilities:                Ability[]
  base_experience:          number
  forms:                    Default[]
  game_indices:             GameIndex[]
  height:                   number
  held_items:               unknown[]
  id:                       number
  is_default:               boolean
  location_area_encounters: string
  moves:                    Move[]
  name:                     string
  order:                    number
  past_abilities:           unknown[]
  past_types:               unknown[]
  species:                  Default
  sprites:                  Sprites
  stats:                    Stat[]
  types:                    Type[]
  weight:                   number
}

export interface Default {
  name: string
  url:  string
}

export interface Ability {
  ability:   Default
  is_hidden: boolean
  slot:      number
}

export interface GameIndex {
  game_index: number
  version:    Default
}

export interface Move {
  move:                  Default
  version_group_details: VersionGroupDetail[]
}

export interface VersionGroupDetail {
  level_learned_at:  number
  move_learn_method: Default
  version_group:     Default
}

export interface GenerationV {
  'black-white': Sprites
}

export interface GenerationIv {
  'diamond-pearl':        Sprites
  'heartgold-soulsilver': Sprites
  platinum:               Sprites
}

export interface Versions {
  'generation-i':    GenerationI
  'generation-ii':   GenerationIi
  'generation-iii':  GenerationIii
  'generation-iv':   GenerationIv
  'generation-v':    GenerationV
  'generation-vi':   { [key: string]: Home }
  'generation-vii':  GenerationVii
  'generation-viii': GenerationViii
}

export interface Sprites {
  back_default:       string
  back_female:        null
  back_shiny:         string
  back_shiny_female:  null
  front_default:      string
  front_female:       null
  front_shiny:        string
  front_shiny_female: null
  other?:             Other
  versions?:          Versions
  animated?:          Sprites
}

export interface GenerationI {
  'red-blue': RedBlue
  yellow:     RedBlue
}

export interface RedBlue {
  back_default:      string
  back_gray:         string
  back_transparent:  string
  front_default:     string
  front_gray:        string
  front_transparent: string
}

export interface GenerationIi {
  crystal: Crystal
  gold:    Gold
  silver:  Gold
}

export interface Crystal {
  back_default:            string
  back_shiny:              string
  back_shiny_transparent:  string
  back_transparent:        string
  front_default:           string
  front_shiny:             string
  front_shiny_transparent: string
  front_transparent:       string
}

export interface Gold {
  back_default:       string
  back_shiny:         string
  front_default:      string
  front_shiny:        string
  front_transparent?: string
}

export interface GenerationIii {
  emerald:             OfficialArtwork
  'firered-leafgreen': Gold
  'ruby-sapphire':     Gold
}

export interface OfficialArtwork {
  front_default: string
  front_shiny:   string
}

export interface Home {
  front_default:      string
  front_female:       null
  front_shiny:        string
  front_shiny_female: null
}

export interface GenerationVii {
  icons:                  DreamWorld
  'ultra-sun-ultra-moon': Home
}

export interface DreamWorld {
  front_default: string
  front_female:  null
}

export interface GenerationViii {
  icons: DreamWorld
}

export interface Other {
  dream_world:        DreamWorld
  home:               Home
  'official-artwork': OfficialArtwork
}

export interface Stat {
  base_stat: number
  effort:    number
  stat:      Default
}

export interface Type {
  slot: number
  type: Default
}
