

const dummy = (blogs) => {
  return blogs.length
}

const totalLikes = (blogs) => {
  return blogs[0].likes ? blogs[0].likes : 0 
}

const mostLiked = (blogs) => {
  return Math.max(...blogs.map((blog) => blog.likes))
}

module.exports = {
  dummy,
  totalLikes,
  mostLiked
}