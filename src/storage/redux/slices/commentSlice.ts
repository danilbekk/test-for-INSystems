import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CommentType } from '../../../interfaces/commentsModel';
const comments = [
  {
    id: '1',
    author: 'John Doe',
    avatar: 'https://example.com/avatar1.jpg',
    text: 'Great post! Thanks for sharing.',
    timestamp: Date.now() - 3600000, // 1 час назад
    rates: [
      {
        user: '3',
        volume: -1,
      },
      {
        user: '2',
        volume: -1,
      },
      {
        user: '4',
        volume: -1,
      },
      {
        user: '5',
        volume: -1,
      },
      {
        user: '6',
        volume: -1,
      },
      {
        user: '7',
        volume: -1,
      },
      {
        user: '8',
        volume: -1,
      },
      {
        user: '9',
        volume: -1,
      },
      {
        user: '10',
        volume: -1,
      },
      {
        user: '11',
        volume: -1,
      },
      {
        user: '12',
        volume: -1,
      },
    ],
    email: '',
  },
  {
    id: '2',
    author: 'Alice Smith',
    avatar: 'https://example.com/avatar2.jpg',
    text: 'I have a question about this. Can you explain it further?',
    timestamp: Date.now() - 60000, // 1 минута назад
    rates: [
      {
        user: '3',
        volume: -1,
      },
      {
        user: '5',
        volume: -1,
      },
    ],
    email: '',
  },
  {
    id: '3',
    author: 'Bob Johnson',
    avatar: 'https://example.com/avatar3.jpg',
    text: 'This is really insightful. Well done!',
    timestamp: Date.now() - 86400000, // 1 день назад
    rates: [
      {
        user: '6',
        volume: 1,
      },
    ],
    email: '',
  },
  {
    id: '4',
    author: 'Eva Williams',
    avatar: 'https://example.com/avatar4.jpg',
    text: "I disagree with some points here. Let's discuss!",
    timestamp: Date.now() - 172800000, // 2 дня назад
    rates: [
      {
        user: '3',
        volume: 1,
      },
    ],
    email: '',
  },
] as CommentType[];
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
    addRate: (state, action) => {
      state.comments = state.comments.map((comment) => {
        const userRateFound = comment.rates.find((rate) => rate.user === action.payload.profileId);
        return comment.id === action.payload.id
          ? {
              ...comment,
              rates: !userRateFound
                ? [...comment.rates, { user: action.payload.profileId, volume: action.payload.volume }]
                : comment.rates
                    .map((rate) => {
                      if (rate.user === action.payload.profileId) {
                        if (rate.volume === action.payload.volume) {
                          return null;
                        } else {
                          return {
                            ...rate,
                            volume: action.payload.volume,
                          };
                        }
                      }
                      return rate;
                    })
                    .filter(Boolean),
            }
          : comment;
      }) as CommentType[];
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

export const { addComment, addRate } = commentSlice.actions;
export default commentSlice.reducer;
