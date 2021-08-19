import { useStore, Dispatch } from 'vuex'
import { defineComponent, ref } from 'vue'
import { useRouter,Router } from 'vue-router'
import { SET_USER } from '@/store/login/actionType'

import {
    ElSkeleton,
    ElDropdown,
    ElDescriptions,
    ElDropdownMenu,
    ElDropdownItem,
    ElDescriptionsItem
} from 'element-plus'

//函数式组件
const DropdownMenu = (dispatch: Dispatch, router: Router): JSX.Element => (
    <ElDropdownMenu>
        <ElDropdownItem
            {...{
                onClick: () => {
                    dispatch(`login/${SET_USER}`, {})
                    localStorage.removeItem('user')
                    router.push({ name: 'login' })
                }
            }} icon="el-icon-switch-button">
                退出登录
        </ElDropdownItem>
    </ElDropdownMenu>
)

export default defineComponent({
    props: {},
    emits: [],
    components: {},
    setup() {
        const router = useRouter()
        const store = useStore()
        const name = ref<string>('')
        const password = ref<string>('')

        setTimeout(() => {
            const userString = localStorage.getItem('user')
            if (userString) {
                const user = JSON.parse(userString)
                store.dispatch(`login/${SET_USER}`, user)
            }
            name.value = store.state.login.user.name
            password.value = store.state.login.user.password.replace(/[\s\S]/g,'*')
        },1000)

        return () => 
            name.value ? (
                <>
                    <ElDropdown
                        style={{ marginBotton: '15px' }}
                        v-slots={{dropdown: DropdownMenu(store.dispatch, router)}}
                    >
                        <span>
                            <i class="el-icon-s-tools el-icon--right" style={{marginRight: '8px'}}></i>
                            设置
                        </span>
                    </ElDropdown>

                    
                </>
            )
    }
})