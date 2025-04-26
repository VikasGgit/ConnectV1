

import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from './features/post/postSlice';
import { useNavigate } from 'react-router-dom';
import {
  IconButton,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  CircularProgress,
  Box,
  Avatar,
  TextField,
  Typography,
  Chip,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import {
  Close as CloseIcon,
  AttachFile as AttachFileIcon,
  InsertLink as InsertLinkIcon,
  InsertEmoticon as InsertEmoticonIcon,
  Image as ImageIcon,
  Cancel as CancelIcon,
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  FormatListBulleted,
  FormatListNumbered,
  Code,
  FormatQuote,
  FormatAlignLeft,
  FormatAlignCenter,
  FormatAlignRight,
  Undo,
  Redo
} from '@mui/icons-material';
import Picker from 'emoji-picker-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { styled } from '@mui/system';

const StyledEditorContainer = styled('div')(({ theme, isFocused }) => ({
  '& .ql-container': {
    border: isFocused ? '1px solid #6C63FF' : '1px solid #e0e0e0',
    borderTop: 'none',
    borderRadius: '0 0 8px 8px',
    minHeight: '200px',
    fontSize: '16px',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
  },
  '& .ql-toolbar': {
    border: isFocused ? '1px solid #6C63FF' : '1px solid #e0e0e0',
    borderBottom: 'none',
    borderRadius: '8px 8px 0 0',
    backgroundColor: '#f9f9f9'
  },
  '& .ql-editor': {
    padding: '16px',
    '&.ql-blank::before': {
      color: '#aaa',
      fontStyle: 'normal',
      left: '16px'
    }
  }
}));

const modules = {
  toolbar: [
    [{ 'header': [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'blockquote', 'code-block'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],
    [{ 'indent': '-1'}, { 'indent': '+1' }],
    [{ 'direction': 'rtl' }],
    [{ 'align': [] }],
    ['link', 'image'],
    ['clean']
  ],
  clipboard: {
    matchVisual: false,
  }
};

const formats = [
  'header',
  'bold', 'italic', 'underline', 'blockquote', 'code-block',
  'list', 'bullet', 'indent',
  'link', 'image',
  'align'
];

const Post = () => {
  const [content, setContent] = useState('');
  const [visibility, setVisibility] = useState('public');
  const [files, setFiles] = useState([]);
  const [filePreviews, setFilePreviews] = useState([]);
  const [emojipicker, setEmojipicker] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [linkDialogOpen, setLinkDialogOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');
  const fileInputRef = useRef(null);
  const quillRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.postReducer);
  const userData = JSON.parse(localStorage.getItem('userData'));

  const onEmojiClick = (emojiData) => {
    const editor = quillRef.current?.getEditor();
    const range = editor?.getSelection();
    if (range) {
      editor?.insertText(range.index, emojiData.emoji);
    }
    setEmojipicker(false);
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length > 0) {
      const newFiles = [...files];
      const newPreviews = [...filePreviews];
      
      selectedFiles.forEach(file => {
        newFiles.push(file);
        
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onloadend = () => {
            newPreviews.push({
              url: reader.result,
              type: 'image',
              name: file.name
            });
            setFilePreviews([...newPreviews]);
          };
          reader.readAsDataURL(file);
        } else if (file.type.startsWith('video/')) {
          newPreviews.push({
            url: URL.createObjectURL(file),
            type: 'video',
            name: file.name
          });
        } else {
          newPreviews.push({
            url: null,
            type: 'file',
            name: file.name
          });
        }
      });
      
      setFiles(newFiles);
      setFilePreviews(newPreviews);
    }
  };

  const removeFile = (index) => {
    const newFiles = [...files];
    const newPreviews = [...filePreviews];
    
    newFiles.splice(index, 1);
    newPreviews.splice(index, 1);
    
    setFiles(newFiles);
    setFilePreviews(newPreviews);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleInsertLink = () => {
    if (linkUrl && linkText) {
      const editor = quillRef.current?.getEditor();
      const range = editor?.getSelection();
      if (range) {
        editor?.insertText(range.index, linkText, 'link', linkUrl);
      }
      setLinkDialogOpen(false);
      setLinkUrl('');
      setLinkText('');
    }
  };

  const handleSubmit = async () => {
    if (!content.trim() && files.length === 0) {
      return alert("Post content or file is required");
    }

    const formData = new FormData();
    formData.append('description', content);
    formData.append('visibility', visibility.toLowerCase());
    
    files.forEach(file => {
      formData.append('picture', file);
    });

    dispatch(createPost(formData)).then((res) => {
      if (!res.error) {
        setContent('');
        setFiles([]);
        setFilePreviews([]);
        setVisibility('public');
        navigate('/welcome');
      }
    });
  };

  const handleImageUpload = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    if (quillRef.current) {
      const toolbar = quillRef.current.getEditor().getModule('toolbar');
      toolbar.addHandler('image', handleImageUpload);
    }
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        p: 2,
        backdropFilter: 'blur(5px)'
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          maxWidth: '700px',
          bgcolor: 'background.paper',
          borderRadius: 3,
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
          p: 3,
          animation: 'fade-in 0.3s ease-in-out',
          border: '1px solid rgba(0, 0, 0, 0.1)'
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar
              src={userData?.user?.picture}
              alt="User"
              sx={{ width: 56, height: 56, boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}
            />
            <Box>
              <Typography variant="h6" fontWeight="medium">
                {userData?.user?.firstName} {userData?.user?.lastName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Post to {visibility.toLowerCase()}
              </Typography>
            </Box>
          </Box>
          <IconButton 
            onClick={() => navigate('/welcome')} 
            sx={{ 
              color: 'text.secondary',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.05)'
              }
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <StyledEditorContainer isFocused={isFocused}>
          <ReactQuill
            ref={quillRef}
            value={content}
            onChange={setContent}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="What's on your mind?"
            modules={modules}
            formats={formats}
            theme="snow"
          />
        </StyledEditorContainer>

        {filePreviews.length > 0 && (
          <Box sx={{ 
            mt: 2,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
            gap: 2
          }}>
            {filePreviews.map((preview, index) => (
              <Box key={index} sx={{ position: 'relative' }}>
                {preview.type === 'image' && (
                  <img
                    src={preview.url}
                    alt="Preview"
                    style={{
                      width: '100%',
                      height: '150px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                      border: '1px solid #e0e0e0'
                    }}
                  />
                )}
                {preview.type === 'video' && (
                  <video
                    src={preview.url}
                    style={{
                      width: '100%',
                      height: '150px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                      border: '1px solid #e0e0e0'
                    }}
                    controls
                  />
                )}
                {preview.type === 'file' && (
                  <Box
                    sx={{
                      width: '100%',
                      height: '150px',
                      borderRadius: '8px',
                      border: '1px solid #e0e0e0',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      p: 2,
                      backgroundColor: '#f5f5f5'
                    }}
                  >
                    <AttachFileIcon sx={{ fontSize: 40, color: 'text.secondary' }} />
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        mt: 1,
                        textAlign: 'center',
                        wordBreak: 'break-word',
                        width: '100%'
                      }}
                    >
                      {preview.name}
                    </Typography>
                  </Box>
                )}
                <IconButton
                  onClick={() => removeFile(index)}
                  sx={{
                    position: 'absolute',
                    top: 4,
                    right: 4,
                    bgcolor: 'rgba(0, 0, 0, 0.5)',
                    color: 'white',
                    '&:hover': {
                      bgcolor: 'rgba(0, 0, 0, 0.7)',
                    }
                  }}
                >
                  <CancelIcon fontSize="small" />
                </IconButton>
              </Box>
            ))}
          </Box>
        )}

        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          mt: 3,
          pt: 2,
          borderTop: '1px solid rgba(0, 0, 0, 0.1)'
        }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Tooltip title="Add emoji">
              <IconButton 
                onClick={() => setEmojipicker(!emojipicker)}
                sx={{ 
                  color: emojipicker ? 'primary.main' : 'text.secondary',
                  '&:hover': {
                    backgroundColor: 'rgba(108, 99, 255, 0.1)'
                  }
                }}
              >
                <InsertEmoticonIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Attach file">
              <label htmlFor="file-input">
                <IconButton 
                  component="span" 
                  sx={{ 
                    color: files.length > 0 ? 'primary.main' : 'text.secondary',
                    '&:hover': {
                      backgroundColor: 'rgba(108, 99, 255, 0.1)'
                    }
                  }}
                >
                  <AttachFileIcon />
                </IconButton>
                <input
                  id="file-input"
                  type="file"
                  hidden
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  accept="image/*"
                  
                />
              </label>
            </Tooltip>

            <Tooltip title="Add link">
              <IconButton 
                onClick={() => setLinkDialogOpen(true)}
                sx={{ 
                  color: 'text.secondary',
                  '&:hover': {
                    backgroundColor: 'rgba(108, 99, 255, 0.1)'
                  }
                }}
              >
                <InsertLinkIcon />
              </IconButton>
            </Tooltip>
          </Box>

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Visibility</InputLabel>
            <Select
              value={visibility}
              onChange={(e) => setVisibility(e.target.value)}
              label="Visibility"
              sx={{ 
                borderRadius: 2,
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(0, 0, 0, 0.1)'
                }
              }}
            >
              <MenuItem value="public">Public</MenuItem>
              <MenuItem value="friends">Friends</MenuItem>
              <MenuItem value="friends-of-friends">Friends of friends</MenuItem>
              <MenuItem value="only-me">Only me</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={loading || (!content.trim() && files.length === 0)}
            sx={{
              px: 3,
              py: 1,
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 'medium',
              backgroundColor: '#6C63FF',
              '&:hover': { 
                backgroundColor: '#5a52e0',
                boxShadow: '0 4px 12px rgba(108, 99, 255, 0.3)'
              },
              '&:disabled': {
                backgroundColor: 'action.disabledBackground',
                color: 'action.disabled'
              },
              boxShadow: 'none'
            }}
          >
            {loading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              'Post'
            )}
          </Button>
        </Box>

        {emojipicker && (
          <Box sx={{ 
            position: 'absolute', 
            zIndex: 10, 
            bottom: '80px', 
            left: '16px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
            borderRadius: '8px',
            overflow: 'hidden'
          }}>
            <Picker 
              onEmojiClick={onEmojiClick} 
              pickerStyle={{ 
                width: '350px',
                border: 'none'
              }} 
            />
          </Box>
        )}

        <Dialog open={linkDialogOpen} onClose={() => setLinkDialogOpen(false)}>
          <DialogTitle>Insert Link</DialogTitle>
          <DialogContent sx={{ minWidth: '400px', pt: 2 }}>
            <TextField
              autoFocus
              margin="dense"
              label="Link URL"
              type="url"
              fullWidth
              variant="outlined"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              label="Link Text"
              type="text"
              fullWidth
              variant="outlined"
              value={linkText}
              onChange={(e) => setLinkText(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setLinkDialogOpen(false)}>Cancel</Button>
            <Button 
              onClick={handleInsertLink} 
              variant="contained"
              disabled={!linkUrl || !linkText}
              sx={{
                backgroundColor: '#6C63FF',
                '&:hover': { backgroundColor: '#5a52e0' }
              }}
            >
              Insert
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default Post;