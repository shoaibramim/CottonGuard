export interface DiseaseProbability {
  [key: string]: number;
}

export interface PredictionResponse {
  predicted_class: string;
  confidence: number;
  severity: string;
  treatment: string;
  probabilities: DiseaseProbability;
  icon?: string;
}

export interface DiseaseInfo {
  severity: string;
  treatment: string;
  icon: string;
}

export const EXAMPLE_IMAGES = [
  { name: "Bacterial_Blight.jpg", url: "/images/Bacterial_Blight.jpg" },
  { name: "Curl_Virus.jpg", url: "/images/Curl_Virus.jpg" },
  { name: "Healthy_Leaf.jpg", url: "/images/Healthy_Leaf.jpg" },
  { name: "Herbicide_Growth_Damage.jpg", url: "/images/Herbicide_Growth_Damage.jpg" },
  { name: "Leaf_Hopper_Jassids.jpg", url: "/images/Leaf_Hopper_Jassids.jpg" },
  { name: "Leaf_Reddening.jpg", url: "/images/Leaf_Reddening.jpg" },
  { name: "Leaf_Varigation.jpg", url: "/images/Leaf_Varigation.jpg" }
];