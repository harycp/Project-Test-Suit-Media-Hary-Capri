<script>
import axios from 'axios'

export default {
  data() {
    return {
      posts: [],
      pageNumber: 1,
      pageSize: 10,
      sortOrder: '-published_at',
      totalPosts: 0,
      visibleRange: 5
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalPosts / this.pageSize)
    },
    startPage() {
      const middle = Math.floor(this.visibleRange / 2)
      if (this.pageNumber <= middle) {
        return 1
      } else if (this.pageNumber >= this.totalPages - middle) {
        return Math.max(1, this.totalPages - this.visibleRange + 1)
      } else {
        return this.pageNumber - middle
      }
    },
    endPage() {
      return Math.min(this.startPage + this.visibleRange - 1, this.totalPages)
    },
    visiblePages() {
      let pages = []
      for (let i = this.startPage; i <= this.endPage; i++) {
        pages.push(i)
      }
      return pages
    }
  },
  methods: {
    fetchPosts() {
      axios
        .get(`${import.meta.env.VITE_API_BASE_URL}/ideas`, {
          params: {
            'page[number]': this.pageNumber,
            'page[size]': this.pageSize,
            append: ['small_image', 'medium_image'],
            sort: this.sortOrder
          }
        })
        .then((response) => {
          this.posts = response.data.data
          this.totalPosts = response.data.meta.total
        })
        .catch((error) => {
          console.error('Error fetching posts:', error)
        })
    },
    goToPage(page) {
      this.pageNumber = page
      localStorage.setItem('pageNumber', this.pageNumber) // Simpan pageNumber ke localStorage
      this.fetchPosts()
    },
    prevPage() {
      if (this.pageNumber > 1) {
        this.pageNumber--
        localStorage.setItem('pageNumber', this.pageNumber) // Simpan pageNumber ke localStorage
        this.fetchPosts()
      }
    },
    nextPage() {
      if (this.pageNumber < this.totalPages) {
        this.pageNumber++
        localStorage.setItem('pageNumber', this.pageNumber)
        this.fetchPosts()
      }
    },
    changePageSize() {
      this.pageNumber = 1
      localStorage.setItem('pageSize', this.pageSize)
      localStorage.setItem('pageNumber', this.pageNumber)
      this.fetchPosts()
    }
  },
  mounted() {
    // Ambil nilai dari localStorage
    this.sortOrder = localStorage.getItem('sortOrder') || this.sortOrder
    this.pageSize = parseInt(localStorage.getItem('pageSize'), 10) || this.pageSize
    this.pageNumber = parseInt(localStorage.getItem('pageNumber'), 10) || this.pageNumber

    this.fetchPosts()
  },
  watch: {
    pageSize(newPageSize) {
      localStorage.setItem('pageSize', newPageSize)
      this.changePageSize()
    },
    sortOrder(newSortOrder) {
      localStorage.setItem('sortOrder', newSortOrder)
      this.fetchPosts()
    },
    pageNumber(newPageNumber) {
      localStorage.setItem('pageNumber', newPageNumber)
    }
  }
}
</script>

<template>
  <div class="container">
    <!-- Filter Section -->
    <div class="filters">
      <div>
        Showing {{ (pageNumber - 1) * pageSize + 1 }} -
        {{ Math.min(pageNumber * pageSize, totalPosts) }} of {{ totalPosts }}
      </div>
      <div>
        <label for="pageSize">Show per page: </label>
        <select
          style="border-radius: 16px; margin-right: 10px"
          id="pageSize"
          v-model="pageSize"
          @change="changePageSize"
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
        <label for="sortOrder">Sort by: </label>
        <select style="border-radius: 16px" id="sortOrder" v-model="sortOrder" @change="fetchPosts">
          <option value="-published_at">Newest</option>
          <option value="published_at">Oldest</option>
        </select>
      </div>
    </div>

    <!-- Posts List -->
    <div class="posts-list">
      <div class="post-card" v-for="post in posts" :key="post.id">
        <img v-lazy="post.small_image[0].url" alt="Thumbnail" />
        <p>
          {{
            new Date(post.published_at).toLocaleString('id-ID', {
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            })
          }}
        </p>
        <h2>{{ post.title }}</h2>
      </div>
    </div>

    <!-- Pagination Controls -->
    <div class="pagination">
      <button @click="prevPage" :disabled="pageNumber === 1">&laquo;&laquo;</button>
      <button @click="prevPage" :disabled="pageNumber === 1">&lsaquo;</button>

      <span v-if="startPage > 1" @click="goToPage(1)" class="page-number">1</span>
      <span v-if="startPage > 2">...</span>

      <span
        v-for="page in visiblePages"
        :key="page"
        :class="{ active: pageNumber === page }"
        @click="goToPage(page)"
        class="page-number"
      >
        {{ page }}
      </span>

      <span v-if="endPage < totalPages - 1">...</span>
      <span v-if="endPage < totalPages" @click="goToPage(totalPages)" class="page-number">
        {{ totalPages }}
      </span>

      <button @click="nextPage" :disabled="pageNumber === totalPages">&rsaquo;</button>
      <button @click="nextPage" :disabled="pageNumber === totalPages">&raquo;&raquo;</button>
    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 0 40px;
}

.filters {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 0 20px;
}

.filters select {
  padding: 5px 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 0.9rem;
}

.posts-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding: 0 20px;
}

.post-card {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.post-card img {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.post-card h2 {
  font-size: 1rem;
  line-height: 1.4rem;
  margin: 10px;
  margin-top: 0px;
  max-height: 3em;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}

.post-card p {
  font-size: 0.9rem;
  font-weight: 700;
  color: #666;
  margin: 10px;
  margin-bottom: 0px;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.page-number {
  margin: 0 5px;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  background-color: #f3f3f3;
}

.page-number.active {
  background-color: #f06c34;
  color: white;
  font-weight: bold;
}

.pagination button {
  background-color: #f06c34;
  color: #fff;
  border: none;
  padding: 5px 10px;
  margin: 0 5px;
  border-radius: 5px;
  cursor: pointer;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
