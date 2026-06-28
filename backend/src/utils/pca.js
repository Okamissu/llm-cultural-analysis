import { PCA } from 'ml-pca'

export function reduceEmbeddings(embeddings, labels) {
  const pca = new PCA(embeddings)

  const coordinates = pca.predict(embeddings).to2DArray()

  return coordinates.map((point, index) => ({
    label: labels[index],
    x: point[0],
    y: point[1],
  }))
}
