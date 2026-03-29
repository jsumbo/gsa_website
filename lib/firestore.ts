import {
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  type DocumentData,
} from "firebase/firestore"
import { app } from "./firebase"
import type { Athlete, BlogPost } from "./data"

const db = getFirestore(app)

export async function getAthletes(): Promise<Athlete[]> {
  const snap = await getDocs(collection(db, "athletes"))
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Athlete))
}

export async function getAthleteById(id: string): Promise<Athlete | null> {
  const snap = await getDoc(doc(db, "athletes", id))
  if (!snap.exists()) return null
  return { id: snap.id, ...snap.data() } as Athlete
}

export async function getAthleteBySlug(slug: string): Promise<Athlete | null> {
  const q = query(collection(db, "athletes"), where("slug", "==", slug))
  const snap = await getDocs(q)
  if (snap.empty) return null
  const d = snap.docs[0]
  return { id: d.id, ...d.data() } as Athlete
}

export async function createAthlete(data: Omit<Athlete, "id">): Promise<string> {
  const ref = await addDoc(collection(db, "athletes"), data as DocumentData)
  return ref.id
}

export async function updateAthlete(id: string, data: Partial<Omit<Athlete, "id">>): Promise<void> {
  await updateDoc(doc(db, "athletes", id), data as DocumentData)
}

export async function deleteAthlete(id: string): Promise<void> {
  await deleteDoc(doc(db, "athletes", id))
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const q = query(collection(db, "blogPosts"), orderBy("publishedAt", "desc"))
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as BlogPost))
}

export async function getFeaturedBlogPosts(): Promise<BlogPost[]> {
  const featuredQ = query(
    collection(db, "blogPosts"),
    where("featured", "==", true),
    orderBy("publishedAt", "desc")
  )
  const featuredSnap = await getDocs(featuredQ)

  if (!featuredSnap.empty) {
    return featuredSnap.docs.map((d) => ({ id: d.id, ...d.data() } as BlogPost))
  }

  const allQ = query(collection(db, "blogPosts"), orderBy("publishedAt", "desc"))
  const allSnap = await getDocs(allQ)
  return allSnap.docs.slice(0, 3).map((d) => ({ id: d.id, ...d.data() } as BlogPost))
}

export async function getBlogPostById(id: string): Promise<BlogPost | null> {
  const snap = await getDoc(doc(db, "blogPosts", id))
  if (!snap.exists()) return null
  return { id: snap.id, ...snap.data() } as BlogPost
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const q = query(collection(db, "blogPosts"), where("slug", "==", slug))
  const snap = await getDocs(q)
  if (snap.empty) return null
  const d = snap.docs[0]
  return { id: d.id, ...d.data() } as BlogPost
}

export async function createBlogPost(data: Omit<BlogPost, "id">): Promise<string> {
  const ref = await addDoc(collection(db, "blogPosts"), data as DocumentData)
  return ref.id
}

export async function updateBlogPost(id: string, data: Partial<Omit<BlogPost, "id">>): Promise<void> {
  await updateDoc(doc(db, "blogPosts", id), data as DocumentData)
}

export async function deleteBlogPost(id: string): Promise<void> {
  await deleteDoc(doc(db, "blogPosts", id))
}
