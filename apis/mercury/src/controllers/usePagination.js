// returns a paginate function for the given model
module.exports = (model) => ({
  paginate: async ({ where, order, include, page, perPage }) => {
    page = page || 1
    perPage = perPage || 20

    const { count: itemCount, rows: items } = await model.findAndCountAll({
      offset: (page - 1) * perPage,
      limit: perPage,
      where,
      order,
      include,
    })

    const pageCount = Math.ceil(itemCount / perPage)
    const currentPage = page > pageCount ? pageCount : page
    return {
      items,
      pageInfo: {
        currentPage: page,
        perPage,
        itemCount,
        pageCount,
        hasPreviousPage: currentPage > 1,
        hasNextPage: currentPage < pageCount,
      },
    }
  },
})
