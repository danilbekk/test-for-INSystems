import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CommentType } from '../../../interfaces/commentsModel';

export const fetchComments = createAsyncThunk('comments/fetch', async (_, thunkAPI) => {
  try {
    const fetchComments = await new Promise<CommentType[]>((resolve) => {
      setTimeout(() => {
        const comments = [
          {
            id: '1',
            author: 'John Doe',
            avatar: 'https://example.com/avatar1.jpg',
            text: 'Great post! Thanks for sharing.',
            timestamp: Date.now() - 3600000, // 1 час назад
            rating: 15,
          },
          {
            id: '2',
            author: 'Alice Smith',
            avatar: 'https://example.com/avatar2.jpg',
            text: 'I have a question about this. Can you explain it further?',
            timestamp: Date.now() - 60000, // 1 минута назад
            rating: 8,
          },
          {
            id: '3',
            author: 'Bob Johnson',
            avatar: 'https://example.com/avatar3.jpg',
            text: 'This is really insightful. Well done!',
            timestamp: Date.now() - 86400000, // 1 день назад
            rating: 25,
          },
          {
            id: '4',
            author: 'Eva Williams',
            avatar: 'https://example.com/avatar4.jpg',
            text: "I disagree with some points here. Let's discuss!",
            timestamp: Date.now() - 172800000, // 2 дня назад
            rating: -5,
          },
        ] as CommentType[];

        resolve(comments);
      }, 500);
    });

    return fetchComments;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message);
  }
});

const commentSlice = createSlice({
  name: 'commentSlice',
  initialState: {
    comments: [] as CommentType[],
    loading: null,
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.comments = action.payload;
    });
  },
});

//export const {} = commentSlice.actions
export default commentSlice.reducer;
