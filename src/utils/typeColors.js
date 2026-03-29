export const TYPE_COLORS = {
  fire:     '#fd7d24',
  water:    '#4592c4',
  grass:    '#9bcc50',
  electric: '#f8d030',
  psychic:  '#f366b9',
  ice:      '#51c4e7',
  dragon:   '#53a4cf',
  dark:     '#707070',
  fairy:    '#fdb9e9',
  normal:   '#a4acaf',
  fighting: '#d56723',
  poison:   '#b97fc9',
  ground:   '#f7de3f',
  flying:   '#3dc7ef',
  bug:      '#729f3f',
  rock:     '#a38c21',
  ghost:    '#7b62a3',
  steel:    '#9eb7b8',
}

export const getTypeColor = (type) => TYPE_COLORS[type] ?? '#a4acaf'