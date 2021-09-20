function init (sectionDomId) {
    const contactForm = $(`#${sectionDomId} .contact-form`)
    const field = contactForm.find('.contact-form__field')
    const input = field.find('input, textarea')
    input.on('focus', function() {
        const label = $(this).parent().find('label');
        label.addClass('field--focused')
    })
    input.on('blur', function() {
        const label = $(this).parent().find('label');
        if (!$(this).val()) {
            label.removeClass('field--focused')
        }
    })
}

init()

$(document).ready(() => {
    /**
     * Api
     */
    const url1 = 'https://gw.luxurypresence.com';
    const companyId1 = '';
    const propertyTypes1 = `
    query PropertyTypes {
      propertyTypes {
        name
      }
    }
  `;

    const locations1 = `
    query Neighborhoods(
    $search: String, 
    $companyId: String, 
    $limit: Int = 2
    ) {
      neighborhoods(
      search: $search, 
      companyId: $companyId, 
      limit: $limit
      ) {
        id
        name
      }
    }
  `;

    const featuredProperties1 = `
    query Properties(
      $search: String, 
      $featuredListing: Boolean = true,
      $companyId: String, 
      $limit: Int = 2
    ) {
      properties(
        search: $search, 
        featuredListing: $featuredListing,
        companyId: $companyId, 
        limit: $limit
      ) {
        id
        name
      }
    }
  `;

    const fetchResults1 = (params) => {
        return superagent
            .post(url1 + '/graphql')
            .withCredentials()
            .send({
                query: params.query,
                variables: {
                    companyId: companyId1,
                    search: params.search
                }
            })
    }

    const onSearch = (e) => {
        const search = e.target.value;
        if (e.length <= 1) return;

        const predefinedParams = {
            companyId1,
            search
        }

        Promise.all([
            fetchResults1({
                query: locations1,
                companyId1,
                search
            }),
            fetchResults1({
                query: featuredProperties1,
                companyId1,
                search
            }),
            fetchResults1({
                query: propertyTypes1,
                companyId1,
                search
            })
        ])
            .then(res => {
                const items = {};
                items.locations = res[0].body.data.neighborhoods;
                items.featuredProperties = res[1].body.data.properties;
                items.propertyTypes = res[2].body.data.propertyTypes
                    .filter(item =>
                        item.name.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((item, index) => ({
                        id: index ,
                        name: propertyTypesLabels[item.name]
                    })).slice(0, 2);
                // resultContainer.trigger('searchSuccess', { search, items });
            })
    }

    onSearch({ target: { value: 12 }})
})
