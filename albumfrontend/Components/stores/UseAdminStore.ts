import {create} from 'zustand'

interface Post{
    id: number;
  title: string;
  description: string;
  userId: string;
  user: {
    firstName: string;
    lastName: string;
    photoUrl: string;
  };
}

interface Album{
    id: number;
  title: string;
  userId: string;
  user: {
    firstName: string;
    lastName: string;
    photoUrl: string;
  };
}

interface AdminState{
posts:Post[];
albums:Album[];
loading:boolean;
setPosts:(posts:Post[])=>void;
setAlbum:(albums:Album[])=>void;
setLoading:(loading:boolean)=>void;
deletePost:(postId:number)=>void;
deleteAlbum:(albumId:number)=>void;
}

const useAdminStore = create<AdminState>((set) => ({
  posts: [],
  albums: [],
  loading: true,
  setPosts: (posts) => set({ posts }),
  setAlbum: (albums) => set({ albums }),
  setLoading: (loading) => set({ loading }),
    deletePost:(postId) =>
    set((state)=>({
        posts:state.posts.filter((post)=>post.id !==postId),
    })),
    deleteAlbum:(albumId) =>
    set((state)=>({
        albums:state.albums.filter((album)=>album.id !==albumId )
    }))


}));


export default useAdminStore;