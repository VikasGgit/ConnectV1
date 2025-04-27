
import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  CircularProgress,
  Collapse,
  Divider,
  IconButton,
  TextField,
  Typography,
  useTheme,
  Snackbar,
  Alert
} from '@mui/material';
import {
  Favorite,
  FavoriteBorder,
  Comment,
  Share,
  MoreVert,
  Send,
  KeyboardArrowDown,
  KeyboardArrowUp
} from '@mui/icons-material';
import { formatDistanceToNow } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchFeedPosts,
  likePost,
  addComment,
  clearPostError,
  clearFeedError
} from './features/post/postSlice';
import { SOCKET_API as scket , API_URL as api, } from "../config/variable";

const PostFeed = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [newComment, setNewComment] = useState({});
  const [expandedComments, setExpandedComments] = useState({});
  const userId = useSelector((state)=>state.status.userId)
  // console.log("userId", userId)

  const renderHTML = (htmlString) => {
    return (
      <div 
        dangerouslySetInnerHTML={{ __html: htmlString }}
        style={{
          fontFamily: theme.typography.fontFamily,
          fontSize: '1rem',
          lineHeight: 1.5,
          '& img': {
            maxWidth: '100%',
            height: 'auto'
          },
          '& p': {
            margin: '0 0 1em 0'
          },
          '& ul, & ol': {
            paddingLeft: '1.5em',
            margin: '0 0 1em 0'
          },
          '& blockquote': {
            borderLeft: `3px solid ${theme.palette.divider}`,
            paddingLeft: '1em',
            margin: '1em 0',
            color: theme.palette.text.secondary,
            fontStyle: 'italic'
          },
          '& pre': {
            backgroundColor: theme.palette.grey[100],
            padding: '1em',
            borderRadius: '4px',
            overflowX: 'auto'
          },
          '& a': {
            color: theme.palette.primary.main,
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline'
            }
          }
        }}
      />
    );
  };

  // Redux state
  const { 
    feed: {
      data: posts,
      page: currentPage,
      totalPages,
      loading: feedLoading,
      error: feedError
    },
    loading: postLoading,
    error: postError
  } = useSelector((state) => state.postReducer);

  
  // Error states
  const [errorSnackbar, setErrorSnackbar] = useState({
    open: false,
    message: ''
  });

  // Fetch posts when page or userId changes
  useEffect(() => {
    if(userId)
    dispatch(fetchFeedPosts({ userId, page, limit }));
    console.log("feed", posts)
  }, [dispatch, userId, page, limit]);

  // Handle errors
  useEffect(() => {
    if (feedError) {
      setErrorSnackbar({ open: true, message: feedError });
      dispatch(clearFeedError());
    }
    if (postError) {
      setErrorSnackbar({ open: true, message: postError });
      dispatch(clearPostError());
    }
  }, [feedError, postError, dispatch]);

  const handleLike = (postId) => {
    dispatch(likePost({ postId, userId }));
  };

  const handleCommentChange = (postId, value) => {
    setNewComment(prev => ({
      ...prev,
      [postId]: value
    }));
  };

  const handleAddComment = (postId) => {
    if (!newComment[postId]?.trim()) return;
    dispatch(addComment({
      postId,
      userId,
      text: newComment[postId]
    })).then(() => {
      setNewComment(prev => ({
        ...prev,
        [postId]: ""
      }));
      // Auto-expand comments when adding a new one
      setExpandedComments(prev => ({
        ...prev,
        [postId]: true
      }));
    });
  };

  const toggleComments = (postId) => {
    setExpandedComments(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const handleCloseSnackbar = () => {
    setErrorSnackbar(prev => ({ ...prev, open: false }));
  };

  if (feedLoading && page === 1) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (feedError && !posts?.length) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography color="error">{feedError}</Typography>
        <Button 
          onClick={() => dispatch(fetchFeedPosts({ userId, page, limit }))} 
          variant="outlined" 
          sx={{ mt: 2 }}
        >
          Retry
        </Button>
      </Box>
    );
  }

  if (!posts?.length) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography>No posts available</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', py: 3 }}>
      {/* Error Snackbar */}
      <Snackbar
        open={errorSnackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          {errorSnackbar.message}
        </Alert>
      </Snackbar>

      {/* Posts List */}
      {posts.map((post) => (
        <Card key={post._id} sx={{ mb: 3, borderRadius: 2, boxShadow: theme.shadows[2] }}>
          {/* Post Header */}
          <CardHeader
            avatar={
              <Avatar 
                src={post.user?.picture || "/logo.svg"} 
                alt={`${post.user?.firstName} ${post.user?.lastName}`}
              />
            }
            action={
              <IconButton>
                <MoreVert />
              </IconButton>
            }
            title={`${post.user?.firstName} ${post.user?.lastName}`}
            subheader={
              <>
                <Typography variant="caption" color="text.secondary">
                  {formatDistanceToNow(new Date(post.createdAt || Date.now()), { addSuffix: true })}
                </Typography>
                <Chip 
                  label={post.visibility} 
                  size="small" 
                  sx={{ ml: 1, textTransform: 'capitalize' }} 
                />
              </>
            }
          />

          {/* Post Content */}
          <CardContent>
            {renderHTML(post.description)}
          </CardContent>

          {/* Post Image */}
          {post.picture && (
            <CardMedia
              component="img"
              image={post.picture}
              alt="Post content"
              sx={{ maxHeight: 500, objectFit: 'contain' }}
            />
          )}

          {/* Post Stats */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 2, py: 1 }}>
            <Typography variant="caption" color="text.secondary">
              {post.likes?.length || 0} likes
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {post.comments?.length || 0} comments
            </Typography>
          </Box>

          <Divider />

          {/* Post Actions */}
          <Box sx={{ display: 'flex', justifyContent: 'space-around', py: 1 }}>
            <Button
              startIcon={
                post.likes?.includes(userId) ? (
                  <Favorite color="error" />
                ) : (
                  <FavoriteBorder />
                )
              }
              onClick={() => handleLike(post._id)}
              disabled={postLoading}
              sx={{ 
                color: post.likes?.includes(userId) ? 'error.main' : 'text.secondary',
                textTransform: 'none'
              }}
            >
              Like
            </Button>
            <Button 
              startIcon={<Comment />} 
              onClick={() => toggleComments(post._id)}
              sx={{ 
                color: 'text.secondary', 
                textTransform: 'none',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              Comment
              {post.comments?.length > 0 && (
                expandedComments[post._id] ? (
                  <KeyboardArrowUp sx={{ ml: 0.5 }} />
                ) : (
                  <KeyboardArrowDown sx={{ ml: 0.5 }} />
                )
              )}
            </Button>
            <Button 
              startIcon={<Share />} 
              sx={{ color: 'text.secondary', textTransform: 'none' }}
            >
              Share
            </Button>
          </Box>

          <Divider />

          {/* Comments Section */}
          <Collapse in={expandedComments[post._id] || false}>
            <Box sx={{ p: 2 }}>
              {/* Existing Comments */}
              {post.comments?.map((comment) => (
                <Box key={comment._id} sx={{ display: 'flex', mb: 2 }}>
                  <Avatar 
                    src={comment.user?.picture || '/logo.svg'} 
                    sx={{ width: 32, height: 32, mr: 1 }} 
                  />
                  <Box>
                    <Box sx={{ 
                      backgroundColor: theme.palette.grey[100], 
                      borderRadius: 2, 
                      p: 1.5,
                      maxWidth: '80%'
                    }}>
                      {/* <Typography variant="subtitle2" fontWeight="medium">
                        {comment.user?.firstName} {comment.user?.lastName}
                      </Typography>
                      <Typography variant="body2">
                        {comment.text}
                      </Typography> */}
                      <Typography variant="body2">
  <span style={{ fontWeight: 'bold' }}>
    {comment.user?.firstName} {comment.user?.lastName}
  </span>{" "}
  {comment.text}
</Typography>
                    </Box>
                    <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                      {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                    </Typography>
                  </Box>
                </Box>
              ))}

              {/* Add Comment */}
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                <Avatar sx={{ width: 32, height: 32, mr: 1 }} />
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  placeholder="Write a comment..."
                  value={newComment[post._id] || ""}
                  onChange={(e) => handleCommentChange(post._id, e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleAddComment(post._id);
                    }
                  }}
                  disabled={postLoading}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 20,
                      backgroundColor: theme.palette.grey[100],
                    }
                  }}
                />
                <IconButton 
                  onClick={() => handleAddComment(post._id)}
                  disabled={!newComment[post._id]?.trim() || postLoading}
                  sx={{ ml: 1 }}
                >
                  <Send color={newComment[post._id]?.trim() ? 'primary' : 'disabled'} />
                </IconButton>
              </Box>
            </Box>
          </Collapse>
        </Card>
      ))}

      {/* Pagination Controls */}
      <Box display="flex" justifyContent="center" mt={3} gap={2}>
        <Button
          variant="outlined"
          disabled={page <= 1 || feedLoading}
          onClick={() => setPage(p => Math.max(1, p - 1))}
        >
          Previous
        </Button>
        <Button
          variant="outlined"
          disabled={page >= totalPages || feedLoading}
          onClick={() => setPage(p => p + 1)}
        >
          Next
        </Button>
      </Box>

      {/* Loading indicator for pagination */}
      {feedLoading && page !== 1 && (
        <Box display="flex" justifyContent="center" mt={2}>
          <CircularProgress size={24} />
        </Box>
      )}
    </Box>
  );
};

export default PostFeed;