import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CommentType } from '../../../interfaces/commentsModel';

interface CommentState {
  comments: CommentType[];
  loading: boolean | null;
  error: string | null;
}

const initialState: CommentState = {
  comments: [],
  loading: null,
  error: null,
};

export const fetchComments = createAsyncThunk<CommentType[], void, { rejectValue: string }>(
  'comments/fetch',
  async (_, thunkAPI) => {
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
              email: ''
            },
            {
              id: '2',
              author: 'Alice Smith',
              avatar: 'https://example.com/avatar2.jpg',
              text: 'I have a question about this. Can you explain it further?',
              timestamp: Date.now() - 60000, // 1 минута назад
              rating: 8,
              email: ''
            },
            {
              id: '3',
              author: 'Bob Johnson',
              avatar: 'https://example.com/avatar3.jpg',
              text: 'This is really insightful. Well done!',
              timestamp: Date.now() - 86400000, // 1 день назад
              rating: 25,
              email: ''
            },
            {
              id: '4',
              author: 'Eva Williams',
              avatar: 'https://example.com/avatar4.jpg',
              text: "I disagree with some points here. Let's discuss!",
              timestamp: Date.now() - 172800000, // 2 дня назад
              rating: -5,
              email: ''
            },
          ] as CommentType[];

          resolve(comments);
        }, 500);
      });

      return fetchComments;
    } catch (e: unknown) {
      if (typeof e === 'string') {
        return thunkAPI.rejectWithValue(e);
      }
      return thunkAPI.rejectWithValue('An error occurred');
    }
  },
);

const commentSlice = createSlice({
  name: 'commentSlice',
  initialState,
  reducers: {
    addComment: (state, action) => {
      state.comments.push(action.payload);
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchComments.fulfilled, (state, action: PayloadAction<CommentType[]>) => {
      state.comments = action.payload;
      state.loading = false;
      state.error = null;
    });

    builder.addCase(fetchComments.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchComments.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const {addComment} = commentSlice.actions
export default commentSlice.reducer;
