export const calculateDegree = (degree: number, gradient: Array<string>) => {
  const perLevelDegree = degree / gradient.length;
  return perLevelDegree;
};
