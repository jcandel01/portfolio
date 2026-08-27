export type DemoKey = 'sphere' | 'best365' | 'rosdrone' | 'ideatracker' | 'storyforge' | 'ecovecinos'
export type FrameKind = 'phone' | 'browser'

export interface Project {
  key: DemoKey
  name: string
  /** One line, shown at `lead` size under the project name. */
  subtitle: string
  description: string
  tech: string[]
  features: string[]
  frame: FrameKind
}

export const projects: Project[] = [
  {
    key: 'sphere',
    name: 'Sphere',
    subtitle: 'Location-based social network',
    description:
      'A social app built around a live map of places and ephemeral events. Users share geotagged posts, follow each other, chat in real time and discover spots near them, powered by a recommendation layer.',
    tech: ['React Native', 'Expo Router', 'Supabase', 'Mapbox', 'Zustand', 'PostgreSQL'],
    features: [
      'Interactive map of places and 24h "pulse" posts',
      'Photo feed with likes and comments',
      'Real-time direct messages and notifications',
      'Follows, profiles and privacy controls',
    ],
    frame: 'phone',
  },
  {
    key: 'best365',
    name: 'best365',
    subtitle: 'Football value-betting and bankroll',
    description:
      'A data product that scrapes football odds from multiple bookmaker APIs and runs an ensemble of models in consensus to estimate fair probabilities and surface +EV opportunities. The ensemble combines Dixon-Coles (MLE), XGBoost, Random Forest, Gradient Boosting, AdaBoost and Logistic Regression with isotonic calibration. A Python backend orchestrates scraping, model inference and API calls; results are stored in Supabase and consumed by the mobile app.',
    tech: ['React Native', 'Expo', 'Supabase', 'Python', 'XGBoost', 'scikit-learn', 'Dixon-Coles', 'GitHub Actions'],
    features: [
      'Six models in consensus, from Dixon-Coles to gradient boosting',
      'Automated odds scraper hitting bookmaker APIs on a schedule',
      'Value bets ranked by expected value with stake suggestions',
      'Bankroll tracker with full bet history and market vs. model comparison',
    ],
    frame: 'phone',
  },
  {
    key: 'rosdrone',
    name: 'ROS2 Drone Autonomy',
    subtitle: 'Autonomous navigation with place recognition',
    description:
      'A robotics project where a drone uses ROS2 nodes to navigate autonomously by combining visual place recognition models such as NetVLAD with YOLO-based object detection. The pipeline fuses camera perception, localization cues and mission logic so the drone can recognize where it is, react to visual targets and keep moving through a planned route without manual guidance.',
    tech: ['ROS2', 'Python', 'NetVLAD', 'YOLO', 'OpenCV', 'PyTorch', 'Computer Vision'],
    features: [
      'ROS2 graph coordinating perception, localization and navigation nodes',
      'NetVLAD-style place recognition for visual relocalization',
      'YOLO detections used as scene cues and safety-aware targets',
      'Autonomous mission loop with waypoint progress and telemetry feedback',
    ],
    frame: 'browser',
  },
  {
    key: 'ideatracker',
    name: 'IdeaTracker',
    subtitle: 'Spatial thinking canvas',
    description:
      'A spatial note-taking app where ideas live as nodes on an infinite "constellation" canvas. Branch ideas into children or bridge unrelated ones with quantum links, for a more visual way to think.',
    tech: ['React Native', 'Expo', 'Supabase', 'Zustand', 'TypeScript'],
    features: [
      'Infinite pan and zoom constellation canvas',
      'Draggable idea nodes with mass and luminance',
      'Branch to create child ideas',
      'Bridge to link unrelated nodes',
    ],
    frame: 'phone',
  },
  {
    key: 'ecovecinos',
    name: 'EcoVecinos',
    subtitle: 'Gamified neighborhood recycling',
    description:
      'Web app developed as a Final Degree Project (TFG) for residential communities to track and gamify recycling. Residents photograph waste items and a custom AI pipeline, combining YOLO Mask instance segmentation, a C-RNN classifier and a generative AI model, identifies the object and determines the correct recycling container. A points-based leaderboard creates friendly competition between neighbors.',
    tech: ['Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS', 'YOLO Mask', 'C-RNN', 'Generative AI'],
    features: [
      'YOLO Mask, C-RNN and generative AI pipeline for detection and classification',
      'AI validates which recycling container the item belongs to',
      'Points system with neighborhood leaderboard',
      'Daily impact tracker showing kg recycled per day',
    ],
    frame: 'browser',
  },
  {
    key: 'storyforge',
    name: 'Storyforge',
    subtitle: 'Writing workspace for novelists',
    description:
      'An editorial workspace for long-form fiction. Combines a scene-focused editor with a global narrative timeline, an event catalog and per-character arcs so authors can keep complex stories coherent.',
    tech: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    features: [
      'Chapter and scene navigation for long drafts',
      'Scene editor linked to narrative events',
      'Global timeline ordering story beats',
      'Character profiles with individual arcs',
    ],
    frame: 'browser',
  },
]
